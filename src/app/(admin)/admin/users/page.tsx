"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MoreVertical, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";

const users = [
  { name: "John Doe", email: "john@atlasdesk.com", role: "Super Admin", status: "Active", lastSeen: "2m ago" },
  { name: "Sarah Smith", email: "sarah@atlasdesk.com", role: "Editor", status: "Active", lastSeen: "15m ago" },
  { name: "Michael Chen", email: "m.chen@client.com", role: "Guest", status: "Inactive", lastSeen: "2d ago" },
  { name: "Emma Wilson", email: "emma@atlasdesk.com", role: "Admin", status: "Active", lastSeen: "1h ago" },
];

export default function UserManagementPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage platform users and access levels.</p>
        </div>
        <Button className="rounded-xl gap-2">
          <UserPlus size={18} /> Invite User
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users by name or email..." className="pl-10 h-11 rounded-xl" />
        </div>
        <Button variant="outline" className="rounded-xl gap-2 h-11">
          <Filter size={18} /> Roles
        </Button>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[300px]">User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, i) => (
                <TableRow key={i} className="hover:bg-slate-50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://picsum.photos/seed/${user.name}/100/100`} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium">{user.role}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Active' ? 'default' : 'secondary'} className="rounded-full">
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{user.lastSeen}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="rounded-lg">
                      <MoreVertical size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
