import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, Mail, User, Calendar, Tag, MessageSquare } from "lucide-react"

import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { MessageActions } from "@/components/admin/message-actions"

export const metadata: Metadata = {
  title: "Message Details | Admin Dashboard",
  description: "View and respond to contact message",
}

async function getMessageById(id: string) {
  try {
    const result = await db.query(
      `
      SELECT id, name, email, subject, message, created_at, status
      FROM contact_messages
      WHERE id = $1
    `,
      [Number.parseInt(id)],
    )

    return result.rows?.[0] || null
  } catch (error) {
    console.error("Error fetching message:", error)
    return null
  }
}

export default async function MessageDetailPage({ params }: { params: { id: string } }) {
  const message = await getMessageById(params.id)

  if (!message) {
    notFound()
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/admin/messages" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Messages
          </Link>
        </Button>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{message.subject}</h1>
            <p className="text-muted-foreground">
              From {message.name} ({message.email})
            </p>
          </div>
          <MessageActions messageId={message.id} currentStatus={message.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Message Content
              </CardTitle>
              <CardDescription>Received {format(new Date(message.created_at), "PPP 'at' p")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap bg-muted p-4 rounded-md">{message.message}</div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <h3 className="text-sm font-medium mb-2">Reply to this message</h3>
              <Textarea placeholder="Type your response here..." className="min-h-32 mb-4 w-full" />
              <div className="flex justify-between w-full">
                <Button variant="outline">Save Draft</Button>
                <Button>Send Response</Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <User className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Name</p>
                  <p className="text-muted-foreground">{message.name}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href={`mailto:${message.email}`} className="text-primary hover:underline">
                    {message.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Tag className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Subject</p>
                  <p className="text-muted-foreground">{message.subject}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Received</p>
                  <p className="text-muted-foreground">
                    {format(new Date(message.created_at), "PPP")}
                    <br />
                    {format(new Date(message.created_at), "p")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span>Current Status</span>
                <StatusBadge status={message.status} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "unread":
      return <Badge variant="secondary">Unread</Badge>
    case "in-progress":
      return (
        <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
          In Progress
        </Badge>
      )
    case "resolved":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
          Resolved
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}
