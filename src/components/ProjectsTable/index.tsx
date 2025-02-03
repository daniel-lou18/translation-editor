import ProjectCards from "./ProjectCards";
import { useProjects } from "@/hooks/useProjects";

export default function ProjectsPage() {
  const { data: projects } = useProjects();

  return (
    <>
      <ProjectCards projects={projects} />{" "}
    </>
  );
}
