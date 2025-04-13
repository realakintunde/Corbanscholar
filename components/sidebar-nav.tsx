import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SidebarNavItem {
  name: string
  href: string
  icon: LucideIcon
}

interface SidebarNavProps {
  href: string
  icon: LucideIcon
  name: string
}

export function SidebarNavItem({ href, icon: Icon, name }: SidebarNavProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
        "hover:bg-accent",
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{name}</span>
    </Link>
  )
}
