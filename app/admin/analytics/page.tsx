import type { Metadata } from "next"
import AnalyticsDashboard from "@/components/admin/analytics-dashboard"

export const metadata: Metadata = {
  title: "Analytics | Admin Dashboard",
  description: "View and analyze scholarship platform metrics",
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          View and analyze metrics and performance data for your scholarship platform.
        </p>
      </div>

      <AnalyticsDashboard />
    </div>
  )
}
