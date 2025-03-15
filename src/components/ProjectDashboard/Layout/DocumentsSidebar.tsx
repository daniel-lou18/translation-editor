import { SearchForm } from "@/components/ProjectDashboard/Layout/search-form";
import { VersionSwitcher } from "@/components/ProjectDashboard/Layout/version-switcher";
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
import { SidebarProps, createProjectSidebarConfig } from "@/config/sidebar";

type AppSidebarProps = {
  projects: NormalizedProjectsWithTranslations | null;
  currentProject: ProjectWithDocsAndTrans | null;
} & SidebarProps;

const iconMap = {
  fileText: <FileText />,
  globe: <Globe />,
  bookType: <BookType />,
  bookOpenText: <BookOpenText />,
  chartBar: <ChartBar />,
  languages: <Languages />,
  settings: <Settings />,
};

export default function DocumentsSidebar({
  projects,
  currentProject,
  ...props
}: AppSidebarProps) {
  if (!projects || !currentProject) return null;

  const projectConfig = createProjectSidebarConfig(currentProject.id);

  const sidebarContentWithJSX: SidebarGroupType[] = projectConfig.map(
    (group) => ({
      label: group.label,
      items: group.items.map((item) => ({
        content: (
          <>
            {item.icon && iconMap[item.icon as keyof typeof iconMap]}{" "}
            {item.label}
          </>
        ),
        href: item.href,
      })),
    })
  );

  return (
    <SidebarComponent {...props} menuContent={sidebarContentWithJSX}>
      <VersionSwitcher projects={projects} defaultProject={currentProject} />
      <SearchForm />
    </SidebarComponent>
  );
}
