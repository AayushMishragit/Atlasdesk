"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Check, Lock, Settings } from "lucide-react";

const roles = [
  { name: "Super Admin", users: 2, perms: ["All Access", "User Management", "Billing", "System Settings"] },
  { name: "Editor", users: 8, perms: ["Content Access", "Project Management", "Team View"] },
  { name: "Support", users: 5, perms: ["View Logs", "Manage Tickets", "Limited Settings"] },
  { name: "Guest", users: 24, perms: ["Read Only", "View Public Data"] },
];

export default function RoleManagementPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Role Management</h1>
          <p className="text-muted-foreground mt-1">Define platform permissions and access hierarchies.</p>
        </div>
        <Button className="rounded-xl gap-2">
          <Shield size={18} /> Create New Role
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {roles.map((role, i) => (
          <Card key={i} className="border-none shadow-sm flex flex-col h-full">
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Lock size={18} className="text-primary" /> {role.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{role.users} active users assigned</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Settings size={18} />
              </Button>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2 mt-2">
                {role.perms.map((perm, p) => (
                  <Badge key={p} variant="secondary" className="bg-slate-100 text-slate-600 border-none font-medium flex items-center gap-1">
                    <Check size={12} /> {perm}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
              <Button variant="outline" className="w-full rounded-xl">Configure Permissions</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
