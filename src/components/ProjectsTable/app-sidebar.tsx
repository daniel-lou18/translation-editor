import * as React from "react";
import { SearchForm } from "@/components/ProjectsTable/search-form";
import { VersionSwitcher } from "@/components/ProjectsTable/version-switcher";
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
} from "@/components/ui/sidebar";
import {
  NormalizedProjectsWithTranslations,
  ProjectWithDocsAndTrans,
} from "@/types";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import { Link } from "react-router";
import { File } from "lucide-react";

type AppSidebarProps = {
  projects: NormalizedProjectsWithTranslations | null;
  currentProject: ProjectWithDocsAndTrans | null;
} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({
  projects,
  currentProject,
  ...props
}: AppSidebarProps) {
  const { projectId, documentId } = useTranslationRoute();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher projects={projects} defaultProject={currentProject} />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex gap-1">
            <File /> Documents
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {currentProject?.documents.map((doc) => (
                <SidebarMenuItem key={doc.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={doc.id === parseInt(documentId || "-1")}
                    variant="outline"
                    size="lg"
                  >
                    <Link to={`/app/projects/${projectId}/documents/${doc.id}`}>
                      {doc.fileName}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
