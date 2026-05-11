"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  CheckCircle2, 
  ListTodo, 
  Users2, 
  TrendingUp,
  BrainCircuit
} from "lucide-react";
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: 'Mon', tasks: 12 },
  { name: 'Tue', tasks: 19 },
  { name: 'Wed', tasks: 15 },
  { name: 'Thu', tasks: 22 },
  { name: 'Fri', tasks: 30 },
  { name: 'Sat', tasks: 20 },
  { name: 'Sun', tasks: 14 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Good morning, John! 👋</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your projects today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-xl glass border-primary/20 text-primary hover:bg-primary/5">
            <BrainCircuit className="mr-2 h-4 w-4" /> AI Workflow Review
          </Button>
          <Button className="rounded-xl shadow-lg shadow-primary/20 bg-primary">
            Share Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Projects", value: "12", icon: Clock, trend: "+2 this week", color: "text-blue-500" },
          { label: "Completed Tasks", value: "128", icon: CheckCircle2, trend: "+14% from last month", color: "text-green-500" },
          { label: "Current Backlog", value: "45", icon: ListTodo, trend: "-5 since yesterday", color: "text-orange-500" },
          { label: "Team Capacity", value: "84%", icon: Users2, trend: "Stable", color: "text-purple-500" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="rounded-2xl border-none soft-shadow bg-card hover:bg-accent/5 transition-colors cursor-pointer group">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color} group-hover:scale-110 transition-transform`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" /> {stat.trend}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-2xl border-none soft-shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold">Team Productivity</h3>
              <p className="text-sm text-muted-foreground">Velocity over the last 7 days</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="tasks" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorTasks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-2xl border-none soft-shadow">
            <CardHeader>
              <CardTitle className="text-base">Quick Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Review UI design", due: "Today", checked: false },
                { title: "Weekly sync prep", due: "11:00 AM", checked: true },
                { title: "Fix billing issue", due: "Tomorrow", checked: false },
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors group">
                  <CheckCircle2 className={`h-4 w-4 ${task.checked ? 'text-primary' : 'text-muted'}`} />
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${task.checked ? 'line-through text-muted-foreground' : ''}`}>{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.due}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
