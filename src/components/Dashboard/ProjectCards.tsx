import { DashboardProject } from "@/types";
import ProjectCard from "./ProjectCard";

export default function ProjectCards({
  projects,
}: {
  projects: DashboardProject[];
}) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectCard {...project} />{" "}
        </li>
      ))}
    </ul>
  );
}
