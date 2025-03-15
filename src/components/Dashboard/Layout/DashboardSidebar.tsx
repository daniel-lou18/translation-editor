import SidebarComponent, {
  SidebarGroupType,
} from "@/components/ui/Layout/Sidebar";
import { dashboardSidebarConfig, SidebarProps } from "@/config/sidebar";
import { LogOut } from "lucide-react";

const iconMap = {
  logout: <LogOut />,
};

export default function DashboardSidebar({ ...props }: SidebarProps) {
  const sidebarContentWithJSX: SidebarGroupType[] = dashboardSidebarConfig.map(
    (group) => ({
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
    })
  );

  return (
    <SidebarComponent menuContent={sidebarContentWithJSX} {...props}>
      <p className="p-2 font-semibold text-xl text-foreground">Dashboard</p>
    </SidebarComponent>
  );
}
