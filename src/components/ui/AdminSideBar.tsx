import { BarChart3, Users, Trophy, Timer, Zap, Home } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: BarChart3,
    badge: null,
  },
  {
    title: "Competitors",
    url: "/admin/competitors",
    icon: Users,
    badge: "125",
  },
  {
    title: "Events",
    url: "/admin/events",
    icon: Trophy,
    badge: "8",
  },
  {
    title: "Solves",
    url: "/admin/solves",
    icon: Timer,
    badge: "1,247",
  },
];

export default function AdminSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="cursor-none">
            <SidebarMenuButton size="lg" asChild className="cursor-none">
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Zap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">CubeComp</span>
                  <span className="truncate text-xs text-muted-foreground">
                    Admin Panel
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Competition Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={true}
                      className="h-10 cursor-none"
                    >
                      <Link href={item.url} className="cursor-none">
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="ml-auto h-5 px-1.5 text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <Home className="size-4" />
                <span>Back to Site</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
