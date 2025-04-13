"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { GraduationCap, Building2, Users, Eye } from "lucide-react"

type StatsData = {
  scholarshipCount: number
  universityCount: number
  userCount: number
  viewCount: number
  scholarshipIncrease: number
  userIncrease: number
  universityIncrease: number
  viewIncrease: number
}

export function DashboardStats() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<StatsData>({
    scholarshipCount: 0,
    universityCount: 0,
    userCount: 0,
    viewCount: 0,
    scholarshipIncrease: 0,
    userIncrease: 0,
    universityIncrease: 0,
    viewIncrease: 0,
  })

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For demonstration, we're using placeholder data with a simulated loading delay
    const timer = setTimeout(() => {
      setStats({
        scholarshipCount: 2350,
        universityCount: 568,
        userCount: 12234,
        viewCount: 45612,
        scholarshipIncrease: 180,
        userIncrease: 10.1,
        universityIncrease: 21,
        viewIncrease: 19,
      })
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Scholarships"
        value={stats.scholarshipCount}
        increase={stats.scholarshipIncrease}
        isLoading={isLoading}
        icon={<GraduationCap className="h-5 w-5" />}
        color="bg-sky-100 dark:bg-sky-900"
        textColor="text-sky-600 dark:text-sky-400"
        trend="up"
      />
      <StatsCard
        title="Active Users"
        value={stats.userCount}
        increase={stats.userIncrease}
        isLoading={isLoading}
        icon={<Users className="h-5 w-5" />}
        color="bg-green-100 dark:bg-green-900"
        textColor="text-green-600 dark:text-green-400"
        trend="up"
        valuePrefix="+"
        increaseUnit="%"
      />
      <StatsCard
        title="Universities"
        value={stats.universityCount}
        increase={stats.universityIncrease}
        isLoading={isLoading}
        icon={<Building2 className="h-5 w-5" />}
        color="bg-amber-100 dark:bg-amber-900"
        textColor="text-amber-600 dark:text-amber-400"
        trend="up"
        increasePrefix="+"
      />
      <StatsCard
        title="Page Views"
        value={stats.viewCount}
        increase={stats.viewIncrease}
        isLoading={isLoading}
        icon={<Eye className="h-5 w-5" />}
        color="bg-purple-100 dark:bg-purple-900"
        textColor="text-purple-600 dark:text-purple-400"
        trend="up"
        increaseUnit="%"
      />
    </div>
  )
}

type StatsCardProps = {
  title: string
  value: number
  increase: number
  isLoading: boolean
  icon: React.ReactNode
  color: string
  textColor: string
  trend: "up" | "down"
  valuePrefix?: string
  increasePrefix?: string
  increaseUnit?: string
}

function StatsCard({
  title,
  value,
  increase,
  isLoading,
  icon,
  color,
  textColor,
  trend,
  valuePrefix = "",
  increasePrefix = "",
  increaseUnit = "",
}: StatsCardProps) {
  const formattedValue = value.toLocaleString()
  const trendColor = trend === "up" ? "text-green-600 dark:text-green-400" : "text-rose-600 dark:text-rose-400"
  const trendSymbol = trend === "up" ? "↑" : "↓"

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${color}`}>
            <div className={textColor}>{icon}</div>
          </div>
          <p className="text-sm font-medium">{title}</p>
        </div>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-9 w-[100px]" />
            <Skeleton className="h-4 w-[70px]" />
          </div>
        ) : (
          <>
            <div className="text-3xl font-bold">
              {valuePrefix}
              {formattedValue}
            </div>
            <p className={`text-xs mt-1 ${trendColor}`}>
              {trendSymbol} {increasePrefix}
              {increase}
              {increaseUnit} from last month
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
