import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { ApplicationStats as ApplicationStatsType } from "@/components/application-tracker"

export function ApplicationStats({ stats }: { stats: ApplicationStatsType }) {
  // Calculate document completion percentage
  const documentCompletionPercentage =
    stats.documents_needed > 0 ? Math.round((stats.documents_uploaded / stats.documents_needed) * 100) : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">Across all statuses</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.upcoming_deadlines.length}</div>
          {stats.upcoming_deadlines.length > 0 ? (
            <p className="text-xs text-muted-foreground">
              Next: {stats.upcoming_deadlines[0].scholarship_title.substring(0, 20)}... in{" "}
              {stats.upcoming_deadlines[0].days_remaining} days
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">No upcoming deadlines</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Document Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.documents_uploaded}/{stats.documents_needed}
          </div>
          <div className="mt-2">
            <Progress value={documentCompletionPercentage} />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{documentCompletionPercentage}% complete</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Status Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs">
              <div className="mr-1 h-2 w-2 rounded-full bg-slate-500" />
              <span>Planning</span>
            </div>
            <span className="text-xs font-medium">{stats.by_status.planning || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs">
              <div className="mr-1 h-2 w-2 rounded-full bg-amber-500" />
              <span>In Progress</span>
            </div>
            <span className="text-xs font-medium">{stats.by_status["in-progress"] || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs">
              <div className="mr-1 h-2 w-2 rounded-full bg-sky-500" />
              <span>Submitted</span>
            </div>
            <span className="text-xs font-medium">{stats.by_status.submitted || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs">
              <div className="mr-1 h-2 w-2 rounded-full bg-green-500" />
              <span>Accepted</span>
            </div>
            <span className="text-xs font-medium">{stats.by_status.accepted || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs">
              <div className="mr-1 h-2 w-2 rounded-full bg-red-500" />
              <span>Rejected</span>
            </div>
            <span className="text-xs font-medium">{stats.by_status.rejected || 0}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
