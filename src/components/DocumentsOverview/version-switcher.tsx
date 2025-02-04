import * as React from "react";
import { Check, ChevronsUpDown, Folder } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  NormalizedProjectsWithTranslations,
  ProjectWithDocsAndTrans,
} from "@/types";
import { Link } from "react-router";

export function VersionSwitcher({
  projects,
  defaultProject,
}: {
  projects: NormalizedProjectsWithTranslations | null;
  defaultProject: ProjectWithDocsAndTrans | null;
}) {
  if (!projects) {
    return <p>No projects to display</p>;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Folder className="size-4" />
              </div>
              <div className="">
                <span className="font-semibold text-lg">
                  {defaultProject ? defaultProject.name : ""}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            {defaultProject
              ? Object.values(projects).map((project) => (
                  <DropdownMenuItem key={project.id} asChild>
                    <Link
                      to={`/app/projects/${project.id}/documents/${project.documents[0].id}`}
                    >
                      {project.name}
                      {project.id === defaultProject.id && (
                        <Check className="ml-auto" />
                      )}
                    </Link>
                  </DropdownMenuItem>
                ))
              : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
