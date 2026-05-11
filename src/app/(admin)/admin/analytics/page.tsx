"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, Server, Database, Globe } from "lucide-react";

const data = [
  { time: '00:00', load: 30 },
  { time: '04:00', load: 25 },
  { time: '08:00', load: 60 },
  { time: '12:00', load: 85 },
  { time: '16:00', load: 70 },
  { time: '20:00', load: 45 },
  { time: '23:59', load: 35 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Analytics</h1>
        <p className="text-muted-foreground mt-1">Real-time health monitoring of AtlasDesk infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Server Load", value: "42%", icon: Server, color: "text-blue-500" },
          { label: "Latency", value: "24ms", icon: Activity, color: "text-green-500" },
          { label: "DB Connections", value: "1,240", icon: Database, color: "text-purple-500" },
          { label: "Traffic Source", value: "US-West", icon: Globe, color: "text-orange-500" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase text-slate-500">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm p-6">
        <CardHeader>
          <CardTitle className="text-lg">Network Traffic (Last 24h)</CardTitle>
        </CardHeader>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="adminLoad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
              <Tooltip />
              <Area type="monotone" dataKey="load" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#adminLoad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
