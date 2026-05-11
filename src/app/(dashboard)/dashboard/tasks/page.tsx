"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Filter, Search, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";

const tasks = [
  { id: 1, title: "Define sprint goals for Q2", project: "Strategy", priority: "High", completed: false },
  { id: 2, title: "Update documentation for API v2", project: "Infrastructure", priority: "Medium", completed: true },
  { id: 3, title: "Fix layout issues on mobile pricing", project: "Marketing", priority: "High", completed: false },
  { id: 4, title: "Design new onboarding flow", project: "Mobile App", priority: "Low", completed: false },
  { id: 5, title: "Internal sync with design team", project: "Operations", priority: "Medium", completed: false },
];

export default function TasksPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground mt-1">Keep track of your personal and team tasks.</p>
        </div>
        <Button className="rounded-xl shadow-lg shadow-primary/20 gap-2">
          <Plus size={18} /> Add Task
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Filter tasks..." className="pl-10 h-11 rounded-xl bg-card border-none soft-shadow" />
        </div>
        <Button variant="outline" className="rounded-xl gap-2 h-11 bg-card border-none soft-shadow">
          <Filter size={18} /> Filters
        </Button>
      </div>

      <Card className="rounded-2xl border-none soft-shadow overflow-hidden">
        <CardContent className="p-0">
          <div className="divide-y">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-4 p-4 hover:bg-accent/5 transition-colors group">
                <Checkbox checked={task.completed} className="w-5 h-5 rounded-lg border-2" />
                <div className="flex-1">
                  <p className={`font-bold text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1">
                      <Tag size={10} /> {task.project}
                    </span>
                    <span className={`text-[10px] font-bold uppercase ${
                      task.priority === 'High' ? 'text-red-500' : 
                      task.priority === 'Medium' ? 'text-orange-500' : 'text-green-500'
                    }`}>
                      {task.priority} Priority
                    </span>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" className="rounded-lg h-8">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
