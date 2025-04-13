import type { Metadata } from "next"
import UniversityManager from "@/components/admin/university-manager"

export const metadata: Metadata = {
  title: "Manage Universities | Admin Dashboard",
  description: "Add, edit, and delete university listings",
}

export default function UniversitiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Universities</h2>
        <p className="text-muted-foreground">Manage university listings across your platform.</p>
      </div>

      <UniversityManager />
    </div>
  )
}
