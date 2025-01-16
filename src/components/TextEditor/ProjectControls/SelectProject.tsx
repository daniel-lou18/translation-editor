import Combobox, { ComboDataElement } from "@/components/ui/Combobox";
import { ProjectWithTranslations } from "@/types";

export default function SelectProject({
  projects,
}: {
  projects: ProjectWithTranslations[];
}) {
  const data: ComboDataElement[] = projects.map((project) => ({
    label: project.name,
    value: project.name,
  }));
  return <Combobox name="projects" data={data} />;
}
