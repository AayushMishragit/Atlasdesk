"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Filter, Calendar } from "lucide-react";

const reports = [
  { title: "Monthly Financial Review", date: "Feb 2024", type: "PDF", size: "2.4 MB" },
  { title: "System Performance Audit", date: "Jan 2024", type: "XLSX", size: "1.1 MB" },
  { title: "User Growth Projections", date: "Q1 2024", type: "PDF", size: "4.8 MB" },
  { title: "Security Compliance Log", date: "Dec 2023", type: "PDF", size: "12.2 MB" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Audits</h1>
          <p className="text-muted-foreground mt-1">Export system data and analytical insights.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl gap-2">
            <Filter size={18} /> Filter
          </Button>
          <Button className="rounded-xl gap-2">
            <Calendar size={18} /> Schedule Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{report.title}</h3>
                  <p className="text-xs text-muted-foreground">{report.date} • {report.type} ({report.size})</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/5 hover:text-primary">
                <Download size={18} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
