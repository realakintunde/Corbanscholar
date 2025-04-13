import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Scholarship Guides | Resources | Scholarship Finder",
  description: "Comprehensive guides to help you navigate the scholarship application process",
}

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}
