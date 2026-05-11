import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { 
  Users, 
  ShieldCheck, 
  BarChart4, 
  Database, 
  Settings2,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#F0F2F5]">
      {/* Simple sidebar for admin */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>
          <span className="font-bold text-lg">Admin Console</span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { icon: BarChart4, label: "Overview" },
            { icon: Users, label: "User Management" },
            { icon: Database, label: "System Logs" },
            { icon: Settings2, label: "Platform Settings" },
          ].map((item, i) => (
            <button key={i} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-500 uppercase font-bold mb-4">Version</p>
          <p className="text-xs text-slate-400">v2.4.12 Enterprise</p>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b px-8 flex items-center justify-between">
          <h2 className="font-bold text-slate-700">Admin Dashboard</h2>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            <div className="h-8 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200" />
              <span className="text-sm font-medium text-slate-600">Super Admin</span>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}