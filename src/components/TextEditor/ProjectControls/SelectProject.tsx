import Combobox, { ComboDataElement } from "@/components/ui/Combobox";
import {
  NormalizedProjectsWithTranslations,
  ProjectWithDocsAndTrans,
} from "@/types";
import { useCallback } from "react";

type SelectProjectProps = {
  projects: NormalizedProjectsWithTranslations;
  currentProject: ProjectWithDocsAndTrans | null;
  navigateTo: (
    projectId: string,
    documentId: string,
    translationId: string
  ) => void;
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

  const handleNavigate = useCallback(
    (projectId: string) => {
      if (!projectId) return;
      navigateTo(
        projectId,
        projects[projectId].documents[0].id.toString(),
        projects[projectId].documents[0].translations[0].id.toString()
      );
    },
    [projects, navigateTo]
  );

  return (
    <Combobox
      name="projects"
      items={items}
      value={currentName}
      onChange={handleNavigate}
    />
  );
}
