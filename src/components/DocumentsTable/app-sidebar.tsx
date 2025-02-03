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
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import { Link } from "react-router";
import { BookType, File, FileSpreadsheet } from "lucide-react";

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
          <SidebarMenu className="font-semibold">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="#">
                  <File /> Documents
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
