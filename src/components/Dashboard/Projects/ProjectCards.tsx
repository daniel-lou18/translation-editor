import { DashboardProject } from "@/types";
import ProjectCard from "./ProjectCard";

export default function ProjectCards({
  projects,
}: {
  projects: DashboardProject[];
}) {
  return (
    <ul className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 grid-flow-row-dense">
      {projects.map((project) => (
        <li key={project.id} className="h-full">
          <ProjectCard {...project} className="h-full" />
        </li>
      ))}
    </ul>
  );
}
