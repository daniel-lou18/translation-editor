import Combobox from "@/components/ui/Combobox";
import {
  NormalizedProjectsWithTranslations,
  ProjectWithDocsAndTrans,
} from "@/types";

type SelectProjectProps = {
  projects: NormalizedProjectsWithTranslations;
  currentProject: ProjectWithDocsAndTrans | null;
  onSelect: (projectId: string) => void;
};

export default function SelectProject({
  projects,
  currentProject,
  onSelect,
}: SelectProjectProps) {
  const items = Object.values(projects).map((project) => ({
    label: project.name,
    value: String(project.id),
  }));

  const currentName = currentProject ? currentProject.name : null;

  return (
    <Combobox
      name="project"
      items={items}
      value={currentName || ""}
      onChange={onSelect}
      buttonVariant="ghost"
    />
  );
}
