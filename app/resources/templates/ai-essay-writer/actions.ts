"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

interface EssayParams {
  essayType: string
  prompt: string
  scholarship: string
  wordCount: number
  userId?: string
  customization?: {
    tone?: string
    focusAreas?: string[]
    style?: string
  }
}

interface SavedEssayParams {
  id?: number
  userId: string
  title: string
  essayType: string
  prompt: string
  scholarship: string
  wordCount: number
  content: string
  customization?: object
}

export async function generateEssay({
  essayType,
  prompt,
  scholarship,
  wordCount,
  userId,
  customization,
}: EssayParams): Promise<{ text: string; success: boolean; error?: string }> {
  try {
    const startTime = performance.now()

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key is missing")
      return {
        success: false,
        text: "",
        error: "OpenAI API key is not configured. Please contact the administrator.",
      }
    }

    const scholarshipInfo = scholarship ? `for the ${scholarship} scholarship` : "for a scholarship application"

    // Build system prompt based on customization options
    let systemPrompt = `You are an expert academic writer helping a student draft a ${essayType} ${scholarshipInfo}. 
    Create a well-structured, compelling draft of approximately ${wordCount} words that addresses the prompt.
    Focus on creating a strong introduction, coherent body paragraphs with clear topic sentences, and a memorable conclusion.
    The essay should be formal but engaging, showcase the student's strengths without being boastful, and be specific rather than generic.
    Do not use placeholder text or mention that this is AI-generated.`

    // Add customization to system prompt if provided
    if (customization) {
      if (customization.tone) {
        systemPrompt += `\nWrite in a ${customization.tone} tone.`
      }

      if (customization.focusAreas && customization.focusAreas.length > 0) {
        systemPrompt += `\nFocus especially on highlighting: ${customization.focusAreas.join(", ")}.`
      }

      if (customization.style) {
        systemPrompt += `\nUse a ${customization.style} writing style.`
      }
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: `The essay prompt is: "${prompt}"\n\nPlease write a ${wordCount}-word ${essayType} that addresses this prompt.`,
      temperature: 0.7,
      maxTokens: wordCount * 2,
    })

    // Record analytics data
    const generationTime = (performance.now() - startTime) / 1000
    try {
      await db.query(
        `INSERT INTO essay_analytics 
          (user_id, essay_type, word_count, scholarship, prompt_length, generation_time) 
         VALUES 
          ($1, $2, $3, $4, $5, $6)`,
        [userId || "anonymous", essayType, wordCount, scholarship, prompt.length, generationTime],
      )
    } catch (analyticsError) {
      console.error("Failed to record analytics:", analyticsError)
      // Continue even if analytics logging fails
    }

    return { text, success: true }
  } catch (error) {
    console.error("Error generating essay:", error)
    return {
      success: false,
      text: "",
      error: "Failed to generate essay. Please try again later.",
    }
  }
}

export async function saveEssayDraft({
  id,
  userId,
  title,
  essayType,
  prompt,
  scholarship,
  wordCount,
  content,
  customization,
}: SavedEssayParams): Promise<{ success: boolean; id?: number; error?: string }> {
  try {
    let result

    if (id) {
      // Update existing draft
      result = await db.query(
        `UPDATE saved_essays 
         SET title = $1, essay_type = $2, scholarship = $3, prompt = $4, 
             word_count = $5, content = $6, customization = $7, updated_at = NOW()
         WHERE id = $8 AND user_id = $9
         RETURNING id`,
        [title, essayType, scholarship, prompt, wordCount, content, JSON.stringify(customization || {}), id, userId],
      )
    } else {
      // Create new draft
      result = await db.query(
        `INSERT INTO saved_essays 
           (user_id, title, essay_type, scholarship, prompt, word_count, content, customization)
         VALUES 
           ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id`,
        [userId, title, essayType, scholarship, prompt, wordCount, content, JSON.stringify(customization || {})],
      )
    }

    if (result.rows.length === 0) {
      return {
        success: false,
        error: "Failed to save draft. Draft may not exist or you don't have permission to edit it.",
      }
    }

    revalidatePath("/resources/templates/ai-essay-writer/saved-drafts")
    return { success: true, id: result.rows[0].id }
  } catch (error) {
    console.error("Error saving essay draft:", error)
    return {
      success: false,
      error: "Failed to save essay draft. Please try again later.",
    }
  }
}

export async function getSavedDrafts(userId: string): Promise<{ drafts: any[]; success: boolean; error?: string }> {
  try {
    const result = await db.query(
      `SELECT id, title, essay_type, scholarship, prompt, word_count, 
              created_at, updated_at
       FROM saved_essays 
       WHERE user_id = $1
       ORDER BY updated_at DESC`,
      [userId],
    )

    return { drafts: result.rows, success: true }
  } catch (error) {
    console.error("Error fetching saved drafts:", error)
    return {
      drafts: [],
      success: false,
      error: "Failed to fetch saved drafts. Please try again later.",
    }
  }
}

export async function getSavedDraft(
  id: number,
  userId: string,
): Promise<{ draft: any; success: boolean; error?: string }> {
  try {
    const result = await db.query(
      `SELECT * FROM saved_essays 
       WHERE id = $1 AND user_id = $2`,
      [id, userId],
    )

    if (result.rows.length === 0) {
      return {
        draft: null,
        success: false,
        error: "Draft not found or you don't have permission to access it.",
      }
    }

    return { draft: result.rows[0], success: true }
  } catch (error) {
    console.error("Error fetching saved draft:", error)
    return {
      draft: null,
      success: false,
      error: "Failed to fetch saved draft. Please try again later.",
    }
  }
}

export async function deleteSavedDraft(id: number, userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await db.query(
      `DELETE FROM saved_essays 
       WHERE id = $1 AND user_id = $2
       RETURNING id`,
      [id, userId],
    )

    if (result.rows.length === 0) {
      return {
        success: false,
        error: "Draft not found or you don't have permission to delete it.",
      }
    }

    revalidatePath("/resources/templates/ai-essay-writer/saved-drafts")
    return { success: true }
  } catch (error) {
    console.error("Error deleting saved draft:", error)
    return {
      success: false,
      error: "Failed to delete saved draft. Please try again later.",
    }
  }
}

export async function submitFeedback(
  essayId: number,
  userId: string,
  rating: number,
  comment: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate rating
    if (rating < 1 || rating > 5) {
      return { success: false, error: "Rating must be between 1 and 5" }
    }

    await db.query(
      `INSERT INTO essay_feedback (essay_id, user_id, rating, comment)
       VALUES ($1, $2, $3, $4)`,
      [essayId, userId || "anonymous", rating, comment],
    )

    return { success: true }
  } catch (error) {
    console.error("Error submitting feedback:", error)
    return {
      success: false,
      error: "Failed to submit feedback. Please try again later.",
    }
  }
}
