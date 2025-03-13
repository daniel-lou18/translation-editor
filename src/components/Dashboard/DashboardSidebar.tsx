import { ComponentProps } from "react";
import { Sidebar } from "../ui/sidebar";
import { LogOut } from "lucide-react";
import SidebarComponent, { SidebarGroupType } from "../ui/Layout/Sidebar";

type DashboardSidebarProps = ComponentProps<typeof Sidebar>;

const sidebarContent: SidebarGroupType[] = [
  {
    label: "Projects",
    items: [
      { content: "All projects", href: "/app/projects" },
      { content: "New project", href: "/app/projects/create" },
    ],
  },
  {
    label: "Translation resources",
    items: [
      { content: "All TMs", href: "/app/resources/tm" },
      { content: "Create TM", href: "/app/resources/tm/create" },
      { content: "All glossaries", href: "/app/resources/glossary" },
      { content: "Create glossary", href: "/app/resources/glossary/create" },
    ],
  },
  {
    label: "Quick start",
    items: [{ content: "Translate document", href: "/app/documents/upload" }],
  },
  {
    label: "Account",
    items: [
      { content: "Preferences", href: "/app/account/preferences" },
      {
        content: (
          <>
            <LogOut /> Log out
          </>
        ),
        href: "/app/account/logout",
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
