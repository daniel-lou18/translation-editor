import Combobox, { ComboDataElement } from "@/components/ui/Combobox";
import {
  NormalizedProjectsWithTranslations,
  ProjectWithTranslations,
} from "@/types";

type SelectProjectProps = {
  projects: NormalizedProjectsWithTranslations;
  currentProject: ProjectWithTranslations | null;
  navigateTo: (projectId: string, translationId: string) => void;
};

export default function SelectProject({
  projects,
  currentProject,
  navigateTo,
}: SelectProjectProps) {
  const items: ComboDataElement[] = Object.values(projects).map((project) => ({
    id: project.id.toString(),
    label: project.name,
    value: project.name,
  }));

  const currentName = currentProject ? currentProject.name : null;

  function handleNavigate(projectId: string) {
    if (!projectId) return;
    navigateTo(projectId, projects[projectId].translations[0].id.toString());
  }

  return (
    <Combobox
      name="projects"
      items={items}
      value={currentName}
      onChange={handleNavigate}
    />
  );
}
