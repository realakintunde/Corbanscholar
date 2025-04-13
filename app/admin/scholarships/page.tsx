import type { Metadata } from "next"
import ScholarshipManager from "@/components/admin/scholarship-manager"

export const metadata: Metadata = {
  title: "Manage Scholarships | Admin Dashboard",
  description: "Add, edit, and delete scholarship listings",
}

export default function ScholarshipsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Scholarships</h2>
        <p className="text-muted-foreground">Manage scholarship listings across your platform.</p>
      </div>

      <ScholarshipManager />
    </div>
  )
}
