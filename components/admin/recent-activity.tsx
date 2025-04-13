import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GraduationCap, FileEdit, Building2, Bell, MessageSquare } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      action: "New Fulbright Scholarship added",
      time: "2 hours ago",
      icon: <GraduationCap className="h-4 w-4" />,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300",
      user: {
        name: "Admin",
        avatar: "/avatar-1.png",
        initials: "AD",
      },
    },
    {
      id: 2,
      action: "User feedback from Sarah O.",
      time: "5 hours ago",
      icon: <MessageSquare className="h-4 w-4" />,
      color: "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300",
      user: {
        name: "Sarah O.",
        avatar: "/avatar-2.png",
        initials: "SO",
      },
    },
    {
      id: 3,
      action: "University of Oxford profile updated",
      time: "Yesterday",
      icon: <Building2 className="h-4 w-4" />,
      color: "bg-amber-100 text-amber-700 dark:bg-amber-800 dark:text-amber-300",
      user: {
        name: "Admin",
        avatar: "/avatar-1.png",
        initials: "AD",
      },
    },
    {
      id: 4,
      action: "New application deadline notification sent",
      time: "Yesterday",
      icon: <Bell className="h-4 w-4" />,
      color: "bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-300",
      user: {
        name: "System",
        avatar: "/avatar-3.png",
        initials: "SY",
      },
    },
    {
      id: 5,
      action: "Content updates to Resources page",
      time: "2 days ago",
      icon: <FileEdit className="h-4 w-4" />,
      color: "bg-rose-100 text-rose-700 dark:bg-rose-800 dark:text-rose-300",
      user: {
        name: "Jane D.",
        avatar: "/avatar-4.png",
        initials: "JD",
      },
    },
  ]

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions and updates on your platform</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-6">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`flex items-start space-x-4 py-4 ${
                index < activities.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className={`${activity.color} p-2 rounded-full shrink-0`}>{activity.icon}</div>
              <div className="space-y-1">
                <div className="flex items-center">
                  <p className="text-sm font-medium leading-none">{activity.action}</p>
                </div>
                <div className="flex items-center pt-2 space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                    <AvatarFallback className="text-xs">{activity.user.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{activity.user.name}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
