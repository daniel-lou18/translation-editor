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

  return (
    <Container className="px-12 py-6 bg-muted/20">
      <ProjectsControls />
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {formattedProjects.map((project) => (
          <li key={project.name}>
            <ProjectCard
              to={`/app/projects/${project.id}/documents/${project.documents[0].id}`}
              {...project}
            />{" "}
          </li>
        ))}{" "}
      </ul>
    </Container>
  );
}
