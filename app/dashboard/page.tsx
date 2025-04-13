"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import UserFavorites from "@/components/user-favorites"
import ApplicationTracker from "@/components/application-tracker"
import { Skeleton } from "@/components/ui/skeleton"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { CalendarDays, BookOpen, FileCheck2, Bell, ArrowUpRight, Clock, Award, School, LogOut } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  const { user, loading, logout } = useAuth()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState({
    savedScholarships: 0,
    activeApplications: 0,
    upcomingDeadlines: 0,
    completedApplications: 0,
  })
  const [recentActivity, setRecentActivity] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Set active tab based on URL parameter
  useEffect(() => {
    if (tabParam && ["overview", "favorites", "applications", "profile"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  // Fetch user dashboard data
  useEffect(() => {
    if (user) {
      const fetchDashboardData = async () => {
        try {
          // In a real app, these would be actual API calls
          // For now, we'll simulate with setTimeout
          setTimeout(() => {
            setStats({
              savedScholarships: 5,
              activeApplications: 2,
              upcomingDeadlines: 3,
              completedApplications: 1,
            })

            setRecentActivity([
              {
                id: 1,
                type: "scholarship_saved",
                title: "Fulbright Foreign Student Program",
                date: "2023-04-12T10:30:00Z",
              },
              {
                id: 2,
                type: "application_updated",
                title: "DAAD Scholarship",
                date: "2023-04-11T14:45:00Z",
              },
              {
                id: 3,
                type: "deadline_approaching",
                title: "Chevening Scholarship",
                date: "2023-04-10T09:15:00Z",
              },
            ])

            setIsLoading(false)
          }, 1000)
        } catch (error) {
          console.error("Error fetching dashboard data:", error)
          setIsLoading(false)
        }
      }

      fetchDashboardData()
    }
  }, [user])

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await logout()
      // The redirect is handled in the auth context
    } catch (error) {
      console.error("Logout failed:", error)
      setIsLoggingOut(false)
    }
  }

  if (loading || !user) {
    return (
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="mt-2 h-4 w-96" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Format date to relative time (e.g., "2 days ago")
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) return "just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`

    return date.toLocaleDateString()
  }

  // Get icon for activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case "scholarship_saved":
        return <BookOpen className="h-4 w-4" />
      case "application_updated":
        return <FileCheck2 className="h-4 w-4" />
      case "deadline_approaching":
        return <Clock className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">Manage your scholarship applications and favorites</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          {isLoggingOut ? "Logging out..." : "Log out"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 h-auto">
          <TabsTrigger value="overview" className="py-2">
            Overview
          </TabsTrigger>
          <TabsTrigger value="favorites" className="py-2">
            Saved Scholarships
          </TabsTrigger>
          <TabsTrigger value="applications" className="py-2">
            Applications
          </TabsTrigger>
          <TabsTrigger value="profile" className="py-2">
            Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="overflow-hidden border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Saved Scholarships</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-blue-500" />
                  <div className="text-2xl font-bold">
                    {isLoading ? <Skeleton className="h-8 w-8" /> : stats.savedScholarships}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Browse and save scholarships you're interested in</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Link href="/search" className="text-xs text-blue-500 flex items-center hover:underline">
                  Find more scholarships <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <FileCheck2 className="mr-2 h-5 w-5 text-green-500" />
                  <div className="text-2xl font-bold">
                    {isLoading ? <Skeleton className="h-8 w-8" /> : stats.activeApplications}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Track your scholarship application progress</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Link href="?tab=applications" className="text-xs text-green-500 flex items-center hover:underline">
                  Manage applications <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border-l-4 border-l-amber-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-5 w-5 text-amber-500" />
                  <div className="text-2xl font-bold">
                    {isLoading ? <Skeleton className="h-8 w-8" /> : stats.upcomingDeadlines}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Applications due in the next 30 days</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Link href="?tab=applications" className="text-xs text-amber-500 flex items-center hover:underline">
                  View deadlines <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Completed Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-purple-500" />
                  <div className="text-2xl font-bold">
                    {isLoading ? <Skeleton className="h-8 w-8" /> : stats.completedApplications}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Successfully submitted applications</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Link href="?tab=applications" className="text-xs text-purple-500 flex items-center hover:underline">
                  View all <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Application Progress</CardTitle>
                <CardDescription>Track your current application progress</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                ) : stats.activeApplications > 0 ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Fulbright Foreign Student Program</span>
                        <span className="text-sm text-muted-foreground">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>3/4 tasks completed</span>
                        <span>Due in 14 days</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">DAAD Scholarship</span>
                        <span className="text-sm text-muted-foreground">40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>2/5 tasks completed</span>
                        <span>Due in 30 days</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <School className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground mb-4">You haven't started any applications yet</p>
                    <Button asChild size="sm">
                      <Link href="/search">Find Scholarships</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-40" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{formatRelativeTime(activity.date)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">No recent activity to display</div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Scholarships</CardTitle>
              <CardDescription>Based on your profile and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="aspect-video w-full">
                        <Skeleton className="h-full w-full" />
                      </div>
                      <div className="p-4">
                        <Skeleton className="h-5 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3 mt-2" />
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  <Link href="/scholarship/1" className="block group">
                    <Card className="overflow-hidden transition-all hover:border-blue-500">
                      <div className="aspect-video w-full bg-muted relative overflow-hidden">
                        <img
                          src="/path-to-opportunity.png"
                          alt="Chevening Scholarship"
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold group-hover:text-blue-500 transition-colors">
                          Chevening Scholarship
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Fully-funded scholarship for international students to study in the UK
                        </p>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <CalendarDays className="h-3 w-3 mr-1" />
                          <span>Deadline: May 15, 2023</span>
                        </div>
                      </div>
                    </Card>
                  </Link>

                  <Link href="/scholarship/2" className="block group">
                    <Card className="overflow-hidden transition-all hover:border-blue-500">
                      <div className="aspect-video w-full bg-muted relative overflow-hidden">
                        <img
                          src="/path-to-opportunity.png"
                          alt="Erasmus Mundus Joint Master Degree"
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold group-hover:text-blue-500 transition-colors">
                          Erasmus Mundus Joint Master Degree
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Study in multiple European countries with a full scholarship
                        </p>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <CalendarDays className="h-3 w-3 mr-1" />
                          <span>Deadline: June 30, 2023</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/search">View All Scholarships</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="favorites">
          <UserFavorites />
        </TabsContent>

        <TabsContent value="applications">
          <ApplicationTracker />
        </TabsContent>

        <TabsContent value="profile">
          <UserProfileForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function UserProfileForm() {
  const { user, updateProfile } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    country: user?.country || "",
    educationLevel: user?.educationLevel || "",
    fieldOfStudy: user?.fieldOfStudy || "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      await updateProfile(formData)
      setMessage({ type: "success", text: "Profile updated successfully" })
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to update profile",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your account details</CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <div
              className={`mb-4 p-3 rounded-md ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
            >
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="educationLevel">Education Level</Label>
              <Input
                id="educationLevel"
                value={formData.educationLevel}
                onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fieldOfStudy">Field of Study</Label>
              <Input
                id="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Deadline Reminders</p>
                  <p className="text-sm text-muted-foreground">Get notified before application deadlines</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Scholarships</p>
                  <p className="text-sm text-muted-foreground">Be informed about new scholarship opportunities</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
            <CardDescription>Manage your account security settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              <Button variant="outline" className="w-full">
                Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full">
                Connected Accounts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
