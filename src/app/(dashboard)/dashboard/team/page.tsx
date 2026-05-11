"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, MoreHorizontal, UserPlus, Shield } from "lucide-react";

const team = [
  { name: "John Doe", role: "Team Lead", status: "Online", email: "john@atlasdesk.com" },
  { name: "Sarah Smith", role: "Product Designer", status: "In Meeting", email: "sarah@atlasdesk.com" },
  { name: "Michael Chen", role: "Frontend Dev", status: "Offline", email: "m.chen@atlasdesk.com" },
  { name: "Emma Wilson", role: "QA Engineer", status: "Online", email: "emma@atlasdesk.com" },
  { name: "Alex Rivers", role: "Backend Architect", status: "Focus Mode", email: "alex@atlasdesk.com" },
];

export default function TeamPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
          <p className="text-muted-foreground mt-1">Manage your team and their access levels.</p>
        </div>
        <Button className="rounded-xl gap-2 shadow-lg shadow-primary/20">
          <UserPlus size={18} /> Invite Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member, i) => (
          <Card key={i} className="border-none soft-shadow group hover:bg-accent/5 transition-colors">
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 rounded-xl border-2 border-background shadow-sm">
                  <AvatarImage src={`https://picsum.photos/seed/${member.name}/100/100`} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base font-bold">{member.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-lg">
                <MoreHorizontal size={18} />
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-center justify-between text-xs">
                  <Badge variant={member.status === 'Online' ? 'default' : 'secondary'} className="rounded-full">
                    {member.status}
                  </Badge>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Mail size={12} /> {member.email}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 rounded-xl text-xs h-8">View Profile</Button>
                  <Button variant="outline" size="icon" className="rounded-xl h-8 w-8">
                    <Shield size={14} className="text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
