"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, Users, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const projects = [
  { id: 1, name: "Mobile App Redesign", team: 5, progress: 75, due: "Apr 12", status: "In Progress" },
  { id: 2, name: "API Infrastructure", team: 3, progress: 40, due: "May 05", status: "Planning" },
  { id: 3, name: "Marketing Site Launch", team: 8, progress: 95, due: "Mar 28", status: "Review" },
  { id: 4, name: "Customer Portal", team: 4, progress: 20, due: "Jun 15", status: "In Progress" },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage and track your active team projects.</p>
        </div>
        <Button className="rounded-xl shadow-lg shadow-primary/20 gap-2">
          <Plus size={18} /> New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="rounded-2xl border-none soft-shadow group hover:bg-accent/5 transition-colors">
            <CardHeader className="flex flex-row items-start justify-between pb-4">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold">{project.name}</CardTitle>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                  {project.status}
                </Badge>
              </div>
              <Button variant="ghost" size="icon" className="rounded-lg">
                <MoreHorizontal size={20} className="text-muted-foreground" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">Progress</span>
                  <span className="font-bold">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-slate-200 overflow-hidden">
                      <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="Member" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">
                    +{project.team - 3}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar size={14} />
                  <span>Due {project.due}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
