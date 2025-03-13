import { ComponentProps } from "react";
import { Sidebar } from "../ui/sidebar";
import { LogOut } from "lucide-react";
import SidebarComponent, { SidebarGroupType } from "../ui/Layout/Sidebar";

type DashboardSidebarProps = ComponentProps<typeof Sidebar>;

const sidebarContent: SidebarGroupType[] = [
  {
    label: "Projects",
    items: [
      { content: "All projects", href: "/app/dashboard/projects" },
      { content: "New project", href: "/app/dashboard/projects/create" },
    ],
  },
  {
    label: "Translation resources",
    items: [
      { content: "All TMs", href: "/app/dashboard/tms" },
      { content: "Create TM", href: "/app/dashboard/tms/create" },
      { content: "All glossaries", href: "/app/dashboard/resources/glossary" },
      {
        content: "Create glossary",
        href: "/app/dashboard/resources/glossary/create",
      },
    ],
  },
  {
    label: "Quick start",
    items: [
      {
        content: "Translate document",
        href: "/app/dashboard/documents/upload",
      },
    ],
  },
  {
    label: "Account",
    items: [
      { content: "Preferences", href: "/app/dashboard/account/preferences" },
      {
        content: (
          <>
            <LogOut /> Log out
          </>
        ),
        href: "/app/dashboard/account/logout",
      },
    ],
  },
];

export default function DashboardSidebar({ ...props }: DashboardSidebarProps) {
  return (
    <SidebarComponent
      children={
        <p className="p-2 font-semibold text-xl text-foreground">Dashboard</p>
      }
      menuContent={sidebarContent}
      {...props}
    />
  );
}
