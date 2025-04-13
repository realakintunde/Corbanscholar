"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, LineChart, Line } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

// Sample data for charts
const monthlyData = [
  { name: "Jan", scholarships: 54, applications: 122, views: 3200 },
  { name: "Feb", scholarships: 67, applications: 143, views: 4100 },
  { name: "Mar", scholarships: 89, applications: 165, views: 5300 },
  { name: "Apr", scholarships: 72, applications: 189, views: 4700 },
  { name: "May", scholarships: 121, applications: 208, views: 6100 },
  { name: "Jun", scholarships: 103, applications: 247, views: 5800 },
]

const countryData = [
  { name: "USA", count: 245 },
  { name: "UK", count: 187 },
  { name: "Canada", count: 142 },
  { name: "Australia", count: 114 },
  { name: "Germany", count: 98 },
  { name: "France", count: 76 },
  { name: "Japan", count: 65 },
]

export function DashboardCharts() {
  const [period, setPeriod] = useState("6m")

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle>Scholarship Analytics</CardTitle>
            <CardDescription>Overview of scholarship data and performance metrics</CardDescription>
          </div>

          <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                period === "30d" ? "bg-background text-foreground shadow-sm" : ""
              }`}
              onClick={() => setPeriod("30d")}
            >
              30d
            </button>
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                period === "6m" ? "bg-background text-foreground shadow-sm" : ""
              }`}
              onClick={() => setPeriod("6m")}
            >
              6m
            </button>
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                period === "1y" ? "bg-background text-foreground shadow-sm" : ""
              }`}
              onClick={() => setPeriod("1y")}
            >
              1y
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="scholarships">
          <TabsList className="mb-4">
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="countries">Countries</TabsTrigger>
          </TabsList>

          <TabsContent value="scholarships" className="space-y-4">
            <ChartContainer
              config={{
                scholarships: {
                  label: "Scholarships",
                  color: "hsl(var(--chart-1))",
                },
                views: {
                  label: "Views",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="scholarships"
                    stroke="var(--color-scholarships)"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                  <Line yAxisId="right" type="monotone" dataKey="views" stroke="var(--color-views)" strokeWidth={2} />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="applications">
            <ChartContainer
              config={{
                applications: {
                  label: "Applications",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="applications" fill="var(--color-applications)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="countries">
            <ChartContainer
              config={{
                count: {
                  label: "Scholarships",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countryData} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
