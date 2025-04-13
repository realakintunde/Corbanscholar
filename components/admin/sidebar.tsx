"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LayoutDashboard, User2, Building2, BarChart3, ListChecks, Settings, Mail, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface SidebarProps {
  className?: string
}

export function AdminSidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const routes = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Scholarships",
      href: "/admin/scholarships",
      icon: FileText,
    },
    {
      name: "Universities",
      href: "/admin/universities",
      icon: Building2,
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
    {
      name: "Reference Data",
      href: "/admin/reference",
      icon: ListChecks,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: User2,
    },
    {
      name: "Content",
      href: "/admin/content",
      icon: FileText,
    },
    {
      name: "Messages",
      href: "/admin/messages",
      icon: Mail,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <nav className={cn("hidden border-r bg-secondary p-3 lg:block", className)}>
      <div className="space-y-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-accent"
          >
            <route.icon className="h-4 w-4" />
            <span>{route.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
