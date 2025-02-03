import * as React from "react";
import { SearchForm } from "@/components/TranslationsTable/search-form";
import { VersionSwitcher } from "@/components/TranslationsTable/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  NormalizedProjectsWithTranslations,
  ProjectWithDocsAndTrans,
} from "@/types";
import { Link } from "react-router";
import { ChartBar, File, Languages, Settings } from "lucide-react";

type AppSidebarProps = {
  projects: NormalizedProjectsWithTranslations | null;
  currentProject: ProjectWithDocsAndTrans | null;
} & React.ComponentProps<typeof Sidebar>;

export default function DocumentsSidebar({
  projects,
  currentProject,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher projects={projects} defaultProject={currentProject} />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="font-semibold">
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg">
                <Link to="#">
                  <File /> Documents
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg">
                <Link to="#">
                  <Languages /> Languages
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg">
                <Link to="#">
                  <ChartBar /> Statistics
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg">
                <Link to="#">
                  <Settings /> Settings
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
