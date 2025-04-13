import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowUpRight, Award, GraduationCap, Building2, Users, FileEdit, Clock, TrendingUp, Globe } from "lucide-react"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { DashboardCharts } from "@/components/admin/dashboard-charts"
import { RecentActivity } from "@/components/admin/recent-activity"

export const metadata: Metadata = {
  title: "Admin Dashboard | Scholarship Finder",
  description: "Manage scholarships, universities, and user data",
}

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back to your scholarship platform admin.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/">
              <Globe className="mr-2 h-4 w-4" />
              View Site
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/scholarships/new">
              <GraduationCap className="mr-2 h-4 w-4" />
              Add Scholarship
            </Link>
          </Button>
        </div>
      </div>

      {/* Dashboard Stats Cards */}
      <DashboardStats />

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Manage</p>
                <h3 className="text-xl font-semibold mt-1">Scholarships</h3>
                <p className="text-sm mt-2 text-muted-foreground">Add, edit, and manage your scholarship listings</p>
                <Button
                  asChild
                  variant="ghost"
                  className="mt-4 p-0 h-auto text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-transparent"
                >
                  <Link href="/admin/scholarships">
                    Manage scholarships <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
              <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
                <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Manage</p>
                <h3 className="text-xl font-semibold mt-1">Universities</h3>
                <p className="text-sm mt-2 text-muted-foreground">Add and manage university profiles and information</p>
                <Button
                  asChild
                  variant="ghost"
                  className="mt-4 p-0 h-auto text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:bg-transparent"
                >
                  <Link href="/admin/universities">
                    Manage universities <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
              <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
                <Building2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">View</p>
                <h3 className="text-xl font-semibold mt-1">Analytics</h3>
                <p className="text-sm mt-2 text-muted-foreground">Review platform metrics and performance data</p>
                <Button
                  asChild
                  variant="ghost"
                  className="mt-4 p-0 h-auto text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-transparent"
                >
                  <Link href="/admin/analytics">
                    View analytics <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
              <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart visualizations */}
        <div className="lg:col-span-2">
          <DashboardCharts />
        </div>

        {/* Recent Activity */}
        <div>
          <RecentActivity />
        </div>
      </div>

      {/* Performance Overview Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Track key metrics and performance indicators for your platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="traffic">Traffic</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
                      <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Application Rate</p>
                      <h4 className="text-2xl font-bold">86%</h4>
                      <p className="text-xs text-green-600">↑ 12% from last month</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
                      <FileEdit className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Completion Rate</p>
                      <h4 className="text-2xl font-bold">72%</h4>
                      <p className="text-xs text-green-600">↑ 8% from last month</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="bg-amber-100 dark:bg-amber-800 p-3 rounded-full">
                      <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Time on Site</p>
                      <h4 className="text-2xl font-bold">5:42</h4>
                      <p className="text-xs text-green-600">↑ 1:12 from last month</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="bg-rose-100 dark:bg-rose-800 p-3 rounded-full">
                      <Users className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">User Retention</p>
                      <h4 className="text-2xl font-bold">65%</h4>
                      <p className="text-xs text-amber-600">↓ 3% from last month</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="scholarships">
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Scholarship performance metrics</p>
              </div>
            </TabsContent>

            <TabsContent value="users">
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">User engagement metrics</p>
              </div>
            </TabsContent>

            <TabsContent value="traffic">
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Traffic source metrics</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
