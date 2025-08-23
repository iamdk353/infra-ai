"use client";

import * as React from "react";
import {
  IconBooks,
  IconBrain,
  IconGraph,
  IconGridDots,
  IconHome,
  IconInnerShadowTop,
  IconReportAnalytics,
  IconReportMoney,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "#",
      icon: IconHome,
    },
    {
      title: "Ai-chat",
      url: "#",
      icon: IconBrain,
    },
    {
      title: "Financial Analyser",
      url: "#",
      icon: IconReportMoney,
    },
    {
      title: "Knowledge",
      url: "#",
      icon: IconBooks,
    },
    {
      title: "Analysis",
      url: "#",
      icon: IconGraph,
    },
    {
      title: "Reports",
      url: "#",
      icon: IconReportAnalytics,
    },
    {
      title: "Cards",
      url: "#",
      icon: IconGridDots,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
