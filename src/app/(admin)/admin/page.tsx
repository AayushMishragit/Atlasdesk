import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, CreditCard, Activity, AlertTriangle } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: "8,241", icon: Users, change: "+12.5%", positive: true },
          { label: "MRR", value: "$42,500", icon: CreditCard, change: "+5.2%", positive: true },
          { label: "API Calls", value: "1.2M", icon: Activity, change: "+18%", positive: true },
          { label: "System Alerts", value: "3", icon: AlertTriangle, change: "-2", positive: true },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold text-slate-500 uppercase">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              <p className={`text-xs mt-1 font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} <span className="text-slate-400 font-normal">from last week</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b">
          <CardTitle className="text-slate-700">Recent User Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {[
                { name: "John Doe", action: "User Login", time: "2 minutes ago", status: "Success" },
                { name: "Sarah Smith", action: "Project Created", time: "15 minutes ago", status: "Success" },
                { name: "System", action: "Backup Completed", time: "1 hour ago", status: "Success" },
                { name: "Unknown", action: "Failed Auth", time: "2 hours ago", status: "Failed" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-700">{row.name}</td>
                  <td className="px-6 py-4 text-slate-600">{row.action}</td>
                  <td className="px-6 py-4 text-slate-500">{row.time}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${row.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}