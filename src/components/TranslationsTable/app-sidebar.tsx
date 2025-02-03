import * as React from "react";
import { SearchForm } from "@/components/TranslationsTable/search-form";
import { VersionSwitcher } from "@/components/TranslationsTable/version-switcher";
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
import { BookType, ChevronRight, File } from "lucide-react";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";

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
        <Collapsible
          title="Documents"
          defaultOpen
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="group/label flex gap-1 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <CollapsibleTrigger>
                <File /> Documents
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {currentProject?.documents.map((doc) => (
                    <SidebarMenuItem key={doc.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={doc.id === parseInt(documentId || "-1")}
                        variant="default"
                        size="lg"
                        className="text-xs"
                      >
                        <Link
                          to={`/app/projects/${projectId}/documents/${doc.id}`}
                        >
                          {doc.fileName}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <Collapsible title="Resources" className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="group/label flex gap-1 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <CollapsibleTrigger>
                <BookType /> Linguistic Resources
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Translation Memory</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Glossaries</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
