"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  BarChart2, 
  Users, 
  Settings, 
  Bell, 
  HelpCircle,
  LayoutGrid
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Briefcase, label: "Projects", href: "/dashboard/projects" },
  { icon: CheckSquare, label: "Tasks", href: "/dashboard/tasks" },
  { icon: BarChart2, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Users, label: "Team", href: "/dashboard/team" },
];

const secondaryItems = [
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: HelpCircle, label: "Support", href: "/dashboard/support" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-sidebar border-r flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 group mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <LayoutGrid size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight">AtlasDesk</span>
        </Link>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative group",
                  isActive 
                    ? "text-primary bg-primary/10 shadow-sm" 
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <item.icon size={20} className={isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"} />
                {item.label}
                {isActive && (
                  <motion.div 
                    layoutId="active-sidebar"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-2">
        {secondaryItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition-all"
          >
            <item.icon size={20} />
            {item.label}
          </Link>
        ))}
        
        <div className="pt-6 mt-6 border-t">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-card border shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">Team Lead</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}