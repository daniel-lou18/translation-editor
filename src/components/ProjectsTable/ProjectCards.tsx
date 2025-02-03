import { ProjectWithDocsAndTrans } from "@/types";
import ProjectCard from "./ProjectCard";
import { formatProjectsToCards } from "@/utils/helpers";
import Container from "../ui/Container";

export default function ProjectCards({
  projects,
}: {
  projects: ProjectWithDocsAndTrans[] | undefined;
}) {
  const formattedProjects = formatProjectsToCards(projects);

  if (!formattedProjects || formattedProjects.length === 0) return null;

  return (
    <Container className="px-12 py-6">
      <h1 className="font-bold text-2xl mb-4">Projects</h1>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {formattedProjects.map((project) => (
          <li key={project.name}>
            <ProjectCard {...project} />{" "}
          </li>
        ))}{" "}
      </ul>
    </Container>
  );
}
