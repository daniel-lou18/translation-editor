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
import { Link, useLocation } from "react-router";
import Container from "../Container";

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
  const location = useLocation();
  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <SidebarComponent {...props}>
      <SidebarHeader>{children}</SidebarHeader>
      <SidebarContent>
        {menuContent.map((group) => (
          <Container key={group.label}>
            <SidebarGroup key={group.label}>
              {group.label ? (
                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              ) : null}
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item, idx) => (
                    <SidebarMenuItem key={idx}>
                      <SidebarMenuButton asChild isActive={isActive(item.href)}>
                        <Link to={item.href}>{item.content}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator className="mx-0" />
          </Container>
        ))}
      </SidebarContent>
    </SidebarComponent>
  );
}
