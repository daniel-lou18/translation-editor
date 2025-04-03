import SidebarComponent, {
  SidebarGroupType,
} from "@/components/ui/Layout/Sidebar";
import { dashboardSidebarConfigV2, SidebarProps } from "@/config/sidebar";
import {
  BrainCircuit,
  Earth,
  Folders,
  Globe,
  Home,
  Layers,
  LogOut,
  Settings,
} from "lucide-react";

const iconMap = {
  logout: <LogOut />,
  home: <Home />,
  projects: <Folders />,
  translations: <Globe />,
  tms: <Layers />,
  ai: <BrainCircuit />,
  settings: <Settings />,
};

export default function DashboardSidebar({ ...props }: SidebarProps) {
  const sidebarContentWithJSX: SidebarGroupType[] =
    dashboardSidebarConfigV2.map((group) => ({
      label: group.label,
      items: group.items.map((item) => ({
        content: (
          <>
            {item.icon && iconMap[item.icon as keyof typeof iconMap]}{" "}
            {item.label}
          </>
        ),
        href: item.href,
      })),
    }));

  return (
    <SidebarComponent menuContent={sidebarContentWithJSX} {...props}>
      <p className="p-2 font-semibold text-xl text-foreground flex items-center gap-2">
        <Earth stroke="indigo" strokeWidth={1.5} /> SemCat
      </p>
    </SidebarComponent>
  );
}
