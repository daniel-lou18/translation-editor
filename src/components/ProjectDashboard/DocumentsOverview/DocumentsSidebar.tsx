import * as React from "react";
import { SearchForm } from "@/components/ProjectDashboard/DocumentsOverview/search-form";
import { VersionSwitcher } from "@/components/ProjectDashboard/DocumentsOverview/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  NormalizedProjectsWithTranslations,
  ProjectWithDocsAndTrans,
} from "@/types";
import { Link } from "react-router";
import {
  BookType,
  ChartBar,
  File,
  FileSpreadsheet,
  Globe,
  Languages,
  Settings,
} from "lucide-react";

type AppSidebarProps = {
  projects: NormalizedProjectsWithTranslations | null;
  currentProject: ProjectWithDocsAndTrans | null;
} & React.ComponentProps<typeof Sidebar>;

export default function DocumentsSidebar({
  projects,
  currentProject,
  ...props
}: AppSidebarProps) {
  if (!projects || !currentProject) return null;

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher projects={projects} defaultProject={currentProject} />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to={`/app/projects/${String(currentProject.id)}/documents`}
                  >
                    <File /> Documents
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to={`/app/projects/${String(
                      currentProject.id
                    )}/translations`}
                  >
                    <Globe /> Translations
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Translation Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="#">
                    <BookType /> Translation Memory
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="#">
                    <FileSpreadsheet /> Glossaries
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="#">
                    <ChartBar /> Statistics
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="#">
                    <Languages /> Languages
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to={`/app/projects/${String(currentProject.id)}/settings`}
                  >
                    <Settings /> Settings
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
