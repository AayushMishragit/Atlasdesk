"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, CheckCircle2, MessageSquare } from "lucide-react";

const activities = [
  { user: "Sarah Smith", action: "uploaded a new design", target: "Mobile App v2", time: "2 hours ago", icon: FileText, color: "bg-blue-100 text-blue-600" },
  { user: "John Doe", action: "completed the task", target: "API Integration", time: "4 hours ago", icon: CheckCircle2, color: "bg-green-100 text-green-600" },
  { user: "Emma Wilson", action: "commented on", target: "User Onboarding", time: "Yesterday", icon: MessageSquare, color: "bg-orange-100 text-orange-600" },
  { user: "System", action: "automated backup finished", target: "Main Database", time: "Yesterday", icon: Clock, color: "bg-slate-100 text-slate-600" },
];

export default function ActivityFeedPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Activity Feed</h1>
        <p className="text-muted-foreground mt-1">Recent events across your workspace.</p>
      </div>

      <div className="space-y-4">
        {activities.map((activity, i) => (
          <Card key={i} className="border-none soft-shadow p-6">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://picsum.photos/seed/${activity.user}/100/100`} />
                <AvatarFallback>{activity.user[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    <span className="font-bold text-slate-800">{activity.user}</span>
                    <span className="text-muted-foreground"> {activity.action} </span>
                    <span className="font-bold text-slate-700">{activity.target}</span>
                  </p>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={12} /> {activity.time}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className={`p-2 rounded-lg ${activity.color}`}>
                    <activity.icon size={16} />
                  </div>
                  <Badge variant="outline" className="rounded-full text-[10px] uppercase font-bold tracking-wider">
                    {activity.icon.name}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
