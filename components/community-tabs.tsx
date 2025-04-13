"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

interface CommunityTabsProps {
  defaultTab: string
  children: React.ReactNode
}

export function CommunityTabs({ defaultTab, children }: CommunityTabsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(defaultTab)

  // Update the URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", value)
    router.push(`/community?${params.toString()}`, { scroll: false })
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-8">
      <TabsList className="mb-4">
        <TabsTrigger value="discussions">Discussions</TabsTrigger>
        <TabsTrigger value="success-stories">Success Stories</TabsTrigger>
        <TabsTrigger value="mentors">Find Mentors</TabsTrigger>
        <TabsTrigger value="events">Events</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  )
}
