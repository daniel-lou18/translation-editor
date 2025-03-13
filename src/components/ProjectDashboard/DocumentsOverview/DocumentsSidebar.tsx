import * as React from "react";
import { SearchForm } from "@/components/ProjectDashboard/DocumentsOverview/search-form";
import { VersionSwitcher } from "@/components/ProjectDashboard/DocumentsOverview/version-switcher";
import { Sidebar } from "@/components/ui/sidebar";
import {
  NormalizedProjectsWithTranslations,
  ProjectWithDocsAndTrans,
} from "@/types";
import {
  BookType,
  BookOpenText,
  ChartBar,
  FileText,
  Globe,
  Languages,
  Settings,
} from "lucide-react";
import SidebarComponent, {
  SidebarGroupType,
} from "@/components/ui/Layout/Sidebar";

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

  const content: SidebarGroupType[] = [
    {
      label: "Navigation",
      items: [
        {
          content: (
            <>
              <FileText /> Documents
            </>
          ),
          href: `/app/projects/${String(currentProject.id)}/documents`,
        },
        {
          content: (
            <>
              <Globe /> All translations
            </>
          ),
          href: `/app/projects/${String(currentProject.id)}/translations`,
        },
      ],
    },
    {
      label: "Translation Resources",
      items: [
        {
          content: (
            <>
              <BookType /> Translation Memory
            </>
          ),
          href: `/app/projects/${String(currentProject.id)}/tms`,
        },
        {
          content: (
            <>
              <BookOpenText /> Glossaries
            </>
          ),
          href: `#`,
        },
      ],
    },
    {
      label: "",
      items: [
        {
          content: (
            <>
              <ChartBar /> Statistics
            </>
          ),
          href: `#`,
        },
        {
          content: (
            <>
              <Languages /> Languages
            </>
          ),
          href: `#`,
        },
        {
          content: (
            <>
              <Settings /> Settings
            </>
          ),
          href: `/app/projects/${String(currentProject.id)}/settings`,
        },
      ],
    },
  ];

  return (
    <SidebarComponent {...props} menuContent={content}>
      <VersionSwitcher projects={projects} defaultProject={currentProject} />
      <SearchForm />
    </SidebarComponent>
  );
}
