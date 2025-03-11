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

  const currentId = currentProject ? String(currentProject.id) : null;

  return (
    <Combobox
      name="project"
      items={items}
      value={currentId || ""}
      onChange={onSelect}
      className="bg-background h-9.5 border-border"
    />
  );
}
