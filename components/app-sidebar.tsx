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
      url: "/app",
      icon: IconHome,
    },
    {
      title: "Ai-chat",
      url: "/app/ai-chat",
      icon: IconBrain,
    },
    // {
    //   title: "Financial Analyser",
    //   url: "/app/financial-analyser",
    //   icon: IconReportMoney,
    // },
    {
      title: "Knowledge",
      url: "/app/knowledge",
      icon: IconBooks,
    },
    {
      title: "Reports",
      url: "/app/reports",
      icon: IconReportAnalytics,
    },
    {
      title: "Analysis",
      url: "/app/analysis",
      icon: IconGraph,
    },

    // {
    //   title: "Cards",
    //   url: "/app/cards",
    //   icon: IconGridDots,
    // },
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
