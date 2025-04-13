"use server"

import { neon } from "@neondatabase/serverless"
import { revalidatePath } from "next/cache"

type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Create a SQL client using the Neon connection string
    const sql = neon(process.env.DATABASE_URL!)

    // Insert the contact form data into the database
    await sql`
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES (${formData.name}, ${formData.email}, ${formData.subject}, ${formData.message})
    `

    // Optional: Send an email notification (would require an email service)
    // await sendEmailNotification(formData)

    // Revalidate the contact page
    revalidatePath("/contact")

    return { success: true }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return {
      success: false,
      error: "Failed to submit your message. Please try again later.",
    }
  }
}

// This function would be implemented if you want to send email notifications
// async function sendEmailNotification(formData: ContactFormData) {
//   // Implementation would depend on your email service provider
// }
