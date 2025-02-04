import * as React from "react";
import { SearchForm } from "@/components/DocumentsOverview/search-form";
import { VersionSwitcher } from "@/components/DocumentsOverview/version-switcher";
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
import { BookType, ChartBar, FileSpreadsheet, Globe } from "lucide-react";

type TranslationsSidebarProps = {
  projects: NormalizedProjectsWithTranslations | null;
  currentProject: ProjectWithDocsAndTrans | null;
} & React.ComponentProps<typeof Sidebar>;

export default function TranslationsSidebar({
  projects,
  currentProject,
  ...props
}: TranslationsSidebarProps) {
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
                  <Globe /> Translations
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg">
                <Link to="#">
                  <BookType /> Translation Memory
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg">
                <Link to="#">
                  <FileSpreadsheet /> Glossaries
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
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
