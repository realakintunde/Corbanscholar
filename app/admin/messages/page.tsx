import type { Metadata } from "next"
import { db } from "@/lib/db"
import { formatDistanceToNow } from "date-fns"
import { Mail, CheckCircle, AlertCircle, Clock } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Contact Messages | Admin Dashboard",
  description: "Manage contact form submissions from users",
}

async function getContactMessages() {
  try {
    const result = await db.query(`
      SELECT id, name, email, subject, message, created_at, status
      FROM contact_messages
      ORDER BY created_at DESC
    `)
    return result.rows || []
  } catch (error) {
    console.error("Error fetching contact messages:", error)
    return []
  }
}

export default async function ContactMessagesPage() {
  const messages = await getContactMessages()

  const unreadMessages = messages.filter((msg) => msg.status === "unread")
  const inProgressMessages = messages.filter((msg) => msg.status === "in-progress")
  const resolvedMessages = messages.filter((msg) => msg.status === "resolved")

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
          <p className="text-muted-foreground">Manage and respond to user inquiries from the contact form</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm py-1">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {unreadMessages.length} Unread
          </Badge>
          <Badge variant="outline" className="text-sm py-1">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            {inProgressMessages.length} In Progress
          </Badge>
          <Badge variant="outline" className="text-sm py-1">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            {resolvedMessages.length} Resolved
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Messages</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <MessageTable messages={messages} />
        </TabsContent>

        <TabsContent value="unread">
          <MessageTable messages={unreadMessages} />
        </TabsContent>

        <TabsContent value="in-progress">
          <MessageTable messages={inProgressMessages} />
        </TabsContent>

        <TabsContent value="resolved">
          <MessageTable messages={resolvedMessages} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MessageTable({ messages }: { messages: any[] }) {
  if (messages.length === 0) {
    return (
      <Card className="mt-6">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Mail className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">No messages found in this category</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-6">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell className="font-medium">{message.name}</TableCell>
                <TableCell>{message.email}</TableCell>
                <TableCell>{message.subject}</TableCell>
                <TableCell>{formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}</TableCell>
                <TableCell>
                  <StatusBadge status={message.status} />
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`/admin/messages/${message.id}`}>View Details</a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
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
