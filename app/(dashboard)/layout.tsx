"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  Bell,
  Mail,
  Star,
  Plus,
  LayoutDashboard,
  Users,
  List,
  ChevronDown,
} from "lucide-react";

// Mock user data - in a real app, this would come from your auth system
const user = {
  id: "user1",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: null,
  role: "USER",
  notifications: 3,
  invitations: 2,
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-muted/30 w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <Link href="/" className="flex items-center gap-2 py-2">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <div className="absolute inset-0 bg-primary/10 rounded-md rotate-45 transform origin-center"></div>
                  <Calendar className="h-5 w-5 text-primary relative z-10" />
                </div>
                <span className="font-bold text-xl text-primary">
                  EventCraft
                </span>
              </Link>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu className="px-2">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard"}
                  size="lg"
                >
                  <Link href="/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Collapsible
                defaultOpen={pathname.includes("/dashboard/events")}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton size="lg">
                      <Calendar className="h-4 w-4" />
                      <span>My Events</span>
                      <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === "/dashboard/events"}
                          size="md"
                        >
                          <Link href="/dashboard/events">
                            <List className="h-4 w-4" />
                            <span>All Events</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === "/dashboard/events/create"}
                          size="md"
                        >
                          <Link href="/dashboard/events/create">
                            <Plus className="h-4 w-4" />
                            <span>Create Event</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname.includes(
                            "/dashboard/events/manage-participants"
                          )}
                          size="md"
                        >
                          <Link href="/dashboard/events/manage-participants">
                            <Users className="h-4 w-4" />
                            <span>Manage Participants</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/invitations"}
                  tooltip="Invitations"
                  size="lg"
                >
                  <Link href="/dashboard/invitations">
                    <Mail className="h-4 w-4" />
                    <span>Invitations</span>
                    {user.invitations > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {user.invitations}
                      </Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/reviews"}
                  tooltip="Reviews"
                  size="lg"
                >
                  <Link href="/dashboard/reviews">
                    <Star className="h-4 w-4" />
                    <span>Reviews</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <div className="px-3 py-2">
              <div className="flex items-center gap-3 mb-3">
                <Avatar>
                  {user.avatar ? (
                    <AvatarImage
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                  ) : (
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col relative">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger />
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                  {user.notifications > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      {user.notifications}
                    </span>
                  )}
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-44 max-w-60" align="end">
                  <DropdownMenuLabel className="truncate">
                    {user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href="/">Profile</Link>
                  </DropdownMenuItem>
                  {user.role === "USER" && (
                    <DropdownMenuItem className="cursor-pointer" asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  {user.role === "ADMIN" && (
                    <DropdownMenuItem className="cursor-pointer" asChild>
                      <Link href="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer focus:bg-destructive focus:text-destructive-foreground"
                    asChild
                  >
                    <Link href="/logout">Logout</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <div className="flex-1 overflow-auto">
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
