"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Copy, ThumbsUp, Download, AlertCircle, Save, Edit, Star } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { generateEssay, saveEssayDraft, submitFeedback } from "./actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"

const essayTypes = [
  { value: "personal-statement", label: "Personal Statement" },
  { value: "motivation-letter", label: "Motivation Letter" },
  { value: "research-proposal", label: "Research Proposal" },
  { value: "statement-of-purpose", label: "Statement of Purpose" },
  { value: "scholarship-essay", label: "Scholarship Essay" },
]

const tones = [
  { value: "formal", label: "Formal" },
  { value: "persuasive", label: "Persuasive" },
  { value: "academic", label: "Academic" },
  { value: "conversational", label: "Conversational" },
  { value: "confident", label: "Confident" },
]

const writingStyles = [
  { value: "analytical", label: "Analytical" },
  { value: "narrative", label: "Narrative" },
  { value: "descriptive", label: "Descriptive" },
  { value: "argumentative", label: "Argumentative" },
  { value: "expository", label: "Expository" },
]

const focusAreaOptions = [
  { id: "achievements", label: "Academic achievements" },
  { id: "challenges", label: "Challenges overcome" },
  { id: "leadership", label: "Leadership experience" },
  { id: "future-goals", label: "Future goals" },
  { id: "community", label: "Community involvement" },
  { id: "diversity", label: "Diverse perspectives" },
  { id: "skills", label: "Relevant skills" },
  { id: "passion", label: "Personal passion" },
]

export default function AIEssayWriter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const draftId = searchParams.get("draft")

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [draftTitle, setDraftTitle] = useState("")
  const [essayType, setEssayType] = useState("personal-statement")
  const [prompt, setPrompt] = useState("")
  const [scholarship, setScholarship] = useState("")
  const [wordCount, setWordCount] = useState("500")
  const [generatedEssay, setGeneratedEssay] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false)
  const [feedbackRating, setFeedbackRating] = useState(0)
  const [feedbackComment, setFeedbackComment] = useState("")
  const [savedEssayId, setSavedEssayId] = useState<number | null>(null)
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)

  // Customization options
  const [selectedTone, setSelectedTone] = useState("")
  const [selectedStyle, setSelectedStyle] = useState("")
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([])

  const { toast } = useToast()

  // Mock user ID - in a real application, this would come from authentication
  const userId = "user-123"

  // Fetch draft if ID is provided
  useEffect(() => {
    if (draftId) {
      // In a real application, we would fetch the draft here
      // For now, let's just show a toast to indicate we would load the draft
      toast({
        title: "Loading draft",
        description: `Loading draft ID: ${draftId}`,
      })
    }
  }, [draftId, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Build customization options
      const customization = showAdvancedOptions
        ? {
            tone: selectedTone || undefined,
            style: selectedStyle || undefined,
            focusAreas: selectedFocusAreas.length > 0 ? selectedFocusAreas : undefined,
          }
        : undefined

      const result = await generateEssay({
        essayType,
        prompt,
        scholarship,
        wordCount: Number.parseInt(wordCount),
        userId,
        customization,
      })

      if (result.success) {
        setGeneratedEssay(result.text)
        toast({
          title: "Essay draft generated",
          description: "Your essay draft has been created. Remember to review and personalize it.",
        })
      } else {
        setError(result.error || "Failed to generate essay. Please try again later.")
        toast({
          title: "Error generating essay",
          description: result.error || "There was a problem generating your essay. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.")
      toast({
        title: "Error generating essay",
        description: "There was a problem generating your essay. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEssay)
    toast({
      title: "Copied to clipboard",
      description: "Essay draft copied to clipboard",
    })
  }

  const saveAsDraft = async () => {
    if (!generatedEssay) {
      toast({
        title: "Nothing to save",
        description: "Generate an essay first before saving as a draft.",
        variant: "destructive",
      })
      return
    }

    if (!draftTitle) {
      toast({
        title: "Title required",
        description: "Please enter a title for your essay draft.",
        variant: "destructive",
      })
      return
    }

    setSaving(true)

    try {
      const result = await saveEssayDraft({
        id: savedEssayId || undefined,
        userId,
        title: draftTitle,
        essayType,
        prompt,
        scholarship,
        wordCount: Number.parseInt(wordCount),
        content: generatedEssay,
        customization: showAdvancedOptions
          ? {
              tone: selectedTone,
              style: selectedStyle,
              focusAreas: selectedFocusAreas,
            }
          : undefined,
      })

      if (result.success) {
        setSavedEssayId(result.id || null)
        toast({
          title: savedEssayId ? "Draft updated" : "Draft saved",
          description: savedEssayId
            ? "Your draft has been updated successfully."
            : "Your essay has been saved as a draft.",
        })
      } else {
        toast({
          title: "Error saving draft",
          description: result.error || "There was a problem saving your draft. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error saving draft",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleSubmitFeedback = async () => {
    if (feedbackRating === 0) {
      toast({
        title: "Rating required",
        description: "Please provide a rating before submitting feedback.",
        variant: "destructive",
      })
      return
    }

    try {
      const result = await submitFeedback(
        savedEssayId || 0, // Would normally be a valid essay ID
        userId,
        feedbackRating,
        feedbackComment,
      )

      if (result.success) {
        setShowFeedbackDialog(false)
        setFeedbackRating(0)
        setFeedbackComment("")
        toast({
          title: "Feedback submitted",
          description: "Thank you for your feedback! It helps us improve our essay generator.",
        })
      } else {
        toast({
          title: "Error submitting feedback",
          description: result.error || "There was a problem submitting your feedback. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error submitting feedback",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      })
    }
  }

  const navigateToSavedDrafts = () => {
    router.push("/resources/templates/ai-essay-writer/saved-drafts")
  }

  const handleFocusAreaChange = (id: string, checked: boolean) => {
    setSelectedFocusAreas((prev) => {
      if (checked) {
        return [...prev, id]
      } else {
        return prev.filter((area) => area !== id)
      }
    })
  }

  // Fallback content for when API key is missing
  const renderFallbackContent = () => (
    <div className="space-y-6">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>API Configuration Error</AlertTitle>
        <AlertDescription>
          The OpenAI API key is not configured. This feature requires a valid API key to function.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Sample Essay Structure</CardTitle>
          <CardDescription>
            While the AI generator is unavailable, here's a structure you can follow for your essay.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Introduction (1 paragraph)</h3>
            <p className="text-sm text-muted-foreground">
              Start with a hook, provide context about yourself, and end with a clear thesis statement that outlines
              your main points.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Body Paragraphs (3-4 paragraphs)</h3>
            <p className="text-sm text-muted-foreground">
              Each paragraph should focus on one main idea with supporting evidence or examples from your experiences.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Conclusion (1 paragraph)</h3>
            <p className="text-sm text-muted-foreground">
              Summarize your main points, restate your thesis in a new way, and end with a memorable closing statement.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Essay Writing Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>
              <a href="/resources/guides/scholarship-essays" className="text-blue-600 hover:underline">
                Scholarship Essay Writing Guide
              </a>
            </li>
            <li>
              <a href="/resources/templates" className="text-blue-600 hover:underline">
                Essay Templates
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="container py-10">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight">AI Essay Writer</h1>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={navigateToSavedDrafts}>
                    <Edit className="mr-2 h-4 w-4" />
                    My Drafts
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View your saved essay drafts</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <p className="text-lg text-muted-foreground">
          Get a head start on your scholarship essays with our AI-powered draft generator.
        </p>
      </div>

      {error && error.includes("API key") ? (
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Essay Details</CardTitle>
              <CardDescription>Provide information about the essay you need to write.</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>API Configuration Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="essay-type">Essay Type</Label>
                  <Select value={essayType} onValueChange={setEssayType} disabled>
                    <SelectTrigger id="essay-type">
                      <SelectValue placeholder="Select essay type" />
                    </SelectTrigger>
                    <SelectContent>
                      {essayTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="button" className="w-full" disabled>
                  AI Essay Generation Unavailable
                </Button>
              </form>
            </CardContent>
          </Card>

          {renderFallbackContent()}
        </div>
      ) : (
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="generate">Generate Essay</TabsTrigger>
            <TabsTrigger value="customize">Customize & Format</TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Essay Details</CardTitle>
                  <CardDescription>Provide information about the essay you need to write.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="essay-type">Essay Type</Label>
                      <Select value={essayType} onValueChange={setEssayType}>
                        <SelectTrigger id="essay-type">
                          <SelectValue placeholder="Select essay type" />
                        </SelectTrigger>
                        <SelectContent>
                          {essayTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="scholarship">Scholarship or Program Name (Optional)</Label>
                      <Input
                        id="scholarship"
                        placeholder="e.g., Fulbright Foreign Student Program"
                        value={scholarship}
                        onChange={(e) => setScholarship(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prompt">Essay Topic or Prompt</Label>
                      <Textarea
                        id="prompt"
                        placeholder="Describe the essay prompt or topic you need to write about..."
                        rows={4}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="word-count">Approximate Word Count</Label>
                      <Select value={wordCount} onValueChange={setWordCount}>
                        <SelectTrigger id="word-count">
                          <SelectValue placeholder="Select word count" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="300">300 words</SelectItem>
                          <SelectItem value="500">500 words</SelectItem>
                          <SelectItem value="750">750 words</SelectItem>
                          <SelectItem value="1000">1000 words</SelectItem>
                          <SelectItem value="1500">1500 words</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="advanced-options"
                        checked={showAdvancedOptions}
                        onCheckedChange={setShowAdvancedOptions}
                      />
                      <Label htmlFor="advanced-options">Show Advanced Customization Options</Label>
                    </div>

                    {showAdvancedOptions && (
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="tone">
                          <AccordionTrigger>Writing Tone</AccordionTrigger>
                          <AccordionContent>
                            <RadioGroup value={selectedTone} onValueChange={setSelectedTone}>
                              {tones.map((tone) => (
                                <div key={tone.value} className="flex items-center space-x-2">
                                  <RadioGroupItem value={tone.value} id={`tone-${tone.value}`} />
                                  <Label htmlFor={`tone-${tone.value}`}>{tone.label}</Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="style">
                          <AccordionTrigger>Writing Style</AccordionTrigger>
                          <AccordionContent>
                            <RadioGroup value={selectedStyle} onValueChange={setSelectedStyle}>
                              {writingStyles.map((style) => (
                                <div key={style.value} className="flex items-center space-x-2">
                                  <RadioGroupItem value={style.value} id={`style-${style.value}`} />
                                  <Label htmlFor={`style-${style.value}`}>{style.label}</Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="focus">
                          <AccordionTrigger>Focus Areas</AccordionTrigger>
                          <AccordionContent>
                            <div className="grid grid-cols-2 gap-2">
                              {focusAreaOptions.map((option) => (
                                <div key={option.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={option.id}
                                    checked={selectedFocusAreas.includes(option.id)}
                                    onCheckedChange={(checked) => handleFocusAreaChange(option.id, checked === true)}
                                  />
                                  <Label htmlFor={option.id}>{option.label}</Label>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}

                    <Button type="submit" className="w-full" disabled={loading || !prompt}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        "Generate Essay Draft"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Generated Essay Draft</CardTitle>
                      <CardDescription>
                        This is a starting point. Always personalize and review before submitting.
                      </CardDescription>
                    </div>
                    {generatedEssay && (
                      <div className="flex gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setShowFeedbackDialog(true)}>
                                <Star className="mr-2 h-4 w-4" />
                                Rate
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Provide feedback on this essay</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="min-h-[300px]">
                    {error && !error.includes("API key") && (
                      <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {generatedEssay ? (
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        {generatedEssay.split("\n").map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                        <p>Your generated essay will appear here.</p>
                      </div>
                    )}
                  </CardContent>
                  {generatedEssay && (
                    <CardFooter className="flex flex-wrap gap-2">
                      {/* Save draft dialog */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" disabled={saving}>
                            {saving ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Save as Draft
                              </>
                            )}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Save Essay Draft</DialogTitle>
                            <DialogDescription>
                              Give your essay draft a title to save it for later editing.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <Label htmlFor="draft-title" className="mb-2">
                              Draft Title
                            </Label>
                            <Input
                              id="draft-title"
                              value={draftTitle}
                              onChange={(e) => setDraftTitle(e.target.value)}
                              placeholder="E.g., Fulbright Personal Statement - First Draft"
                            />
                          </div>
                          <DialogFooter>
                            <Button onClick={saveAsDraft} disabled={saving || !draftTitle}>
                              {saving ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Saving...
                                </>
                              ) : (
                                "Save Draft"
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" onClick={copyToClipboard}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy to Clipboard
                      </Button>
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download as Document
                      </Button>
                    </CardFooter>
                  )}
                </Card>

                {generatedEssay && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Tips for Improving Your Essay</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <ThumbsUp className="mr-2 h-4 w-4 text-green-600" />
                          <span>Personalize the essay with your own experiences and voice.</span>
                        </li>
                        <li className="flex items-start">
                          <ThumbsUp className="mr-2 h-4 w-4 text-green-600" />
                          <span>Add specific examples that demonstrate your points.</span>
                        </li>
                        <li className="flex items-start">
                          <ThumbsUp className="mr-2 h-4 w-4 text-green-600" />
                          <span>Ensure all information is accurate and relevant to your application.</span>
                        </li>
                        <li className="flex items-start">
                          <ThumbsUp className="mr-2 h-4 w-4 text-green-600" />
                          <span>Have someone else review your final essay before submission.</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="customize">
            <Card>
              <CardHeader>
                <CardTitle>Essay Formatting Options</CardTitle>
                <CardDescription>Customize the format and style of your essay before generating</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Style Presets</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4"
                        >
                          <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                          <path d="M21 8v13H3V8" />
                          <path d="M18 3v3a2 2 0 0 0 2 2h3" />
                        </svg>
                        Academic
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4"
                        >
                          <path d="M12 12c1.2-1.2 2-2.3 2-3.8 0-1.2-.5-1.8-1.5-1.8-.9 0-1.5.7-1.5 1.6v.2" />
                          <path d="M12 12c-1.2-1.2-2-2.3-2-3.8 0-1.2.5-1.8 1.5-1.8.9 0 1.5.7 1.5 1.6v.2" />
                          <path d="M12 22v-9" />
                          <path d="M15.4 10 12 7l-2.6 2.4" />
                        </svg>
                        Creative
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M15 9.354a4 4 0 1 0 0 5.292" />
                        </svg>
                        Technical
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4"
                        >
                          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                          <line x1="9" x2="9" y1="3" y2="18" />
                          <line x1="15" x2="15" y1="6" y2="21" />
                        </svg>
                        Global
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Citation Style</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start">
                        APA
                      </Button>
                      <Button variant="outline" className="justify-start">
                        MLA
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Chicago
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Harvard
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Reference Inclusions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="include-citations" />
                      <Label htmlFor="include-citations">Include in-text citations</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="include-bibliography" />
                      <Label htmlFor="include-bibliography">Include bibliography</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="include-footnotes" />
                      <Label htmlFor="include-footnotes">Include footnotes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="include-quotes" />
                      <Label htmlFor="include-quotes">Include relevant quotes</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Structure Complexity</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-auto flex-col items-start p-4">
                      <div className="font-medium mb-1">Simple</div>
                      <div className="text-sm text-muted-foreground text-left">Basic intro, body, conclusion</div>
                    </Button>
                    <Button variant="outline" className="h-auto flex-col items-start p-4 border-primary">
                      <div className="font-medium mb-1">Intermediate</div>
                      <div className="text-sm text-muted-foreground text-left">
                        Well-structured with multiple body paragraphs
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto flex-col items-start p-4">
                      <div className="font-medium mb-1">Advanced</div>
                      <div className="text-sm text-muted-foreground text-left">
                        Complex structure with sections and subsections
                      </div>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Feedback Dialog */}
      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate Your Generated Essay</DialogTitle>
            <DialogDescription>Your feedback helps us improve our AI essay writer.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="rating" className="block mb-2">
                Rating (1-5 stars)
              </Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    type="button"
                    variant="ghost"
                    size="sm"
                    className={`p-0 h-8 w-8 ${feedbackRating >= star ? "text-yellow-400" : "text-muted-foreground"}`}
                    onClick={() => setFeedbackRating(star)}
                  >
                    <Star className="h-6 w-6 fill-current" />
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="comment" className="block mb-2">
                Comments (Optional)
              </Label>
              <Textarea
                id="comment"
                placeholder="Share your thoughts on the quality of the essay..."
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFeedbackDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitFeedback} disabled={feedbackRating === 0}>
              Submit Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
