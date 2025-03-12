import { ComponentProps } from "react";
import { Sidebar } from "../ui/sidebar";
import { LogOut } from "lucide-react";
import SidebarComponent, { SidebarGroupType } from "../ui/Layout/Sidebar";

type DashboardSidebarProps = ComponentProps<typeof Sidebar>;

const sidebarContent: SidebarGroupType[] = [
  {
    label: "Projects",
    items: [{ content: "All projects", href: "/app/projects" }],
  },
  {
    label: "Upload",
    items: [
      { content: "Upload Document", href: "/app/upload/document" },
      { content: "Upload TM", href: "/app/upload/tm" },
    ],
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
