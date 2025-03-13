import {
  Sidebar as SidebarComponent,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { ComponentProps, ReactNode } from "react";
import { Link } from "react-router";

type SidebarProps = ComponentProps<typeof SidebarComponent> & {
  children: ReactNode;
  menuContent: SidebarGroupType[];
};

export type SidebarGroupType = {
  label: string | null;
  items: SidebarItem[];
};

type SidebarItem = {
  content: ReactNode;
  href: string;
};

export default function Sidebar({
  children,
  menuContent,
  ...props
}: SidebarProps) {
  return (
    <SidebarComponent {...props}>
      <SidebarHeader>{children}</SidebarHeader>
      <SidebarContent>
        {menuContent.map((group) => (
          <>
            <SidebarGroup key={group.label}>
              {group.label ? (
                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              ) : null}
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item, idx) => (
                    <SidebarMenuItem key={idx}>
                      <SidebarMenuButton asChild>
                        <Link to={item.href}>{item.content}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator className="mx-0" />
          </>
        ))}
      </SidebarContent>
    </SidebarComponent>
  );
}
