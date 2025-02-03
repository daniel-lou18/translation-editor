import { ProjectWithDocsAndTrans } from "@/types";
import ProjectCard from "./ProjectCard";
import { formatProjectsToCards } from "@/utils/helpers";
import Container from "../ui/Container";
import ProjectsControls from "./ProjectsControls";

export default function ProjectCards({
  projects,
}: {
  projects: ProjectWithDocsAndTrans[] | undefined;
}) {
  const formattedProjects = formatProjectsToCards(projects);

  if (!formattedProjects || formattedProjects.length === 0) return null;

  console.log({ projects });

  return (
    <Container className="px-12 py-6 bg-muted/20">
      <ProjectsControls />
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {formattedProjects.map((project) => (
          <li key={project.id}>
            <ProjectCard {...project} />{" "}
          </li>
        ))}{" "}
      </ul>
    </Container>
  );
}
