import { formatProjectsToCards } from "@/utils/helpers";
import Container from "../../ui/Container";
import PageTitle from "../../ui/PageTitle";
import SearchForm from "../../ui/SearchForm";
import { Button } from "../../ui/button";
import ProjectCards from "./ProjectCards";
import { Link } from "react-router";
import PageControls from "../../ui/PageControls";
import { useProjects } from "@/hooks/useProjects";

export default function DashboardProjects() {
  const { data: projects } = useProjects();

  const formattedProjects = formatProjectsToCards(projects);

  if (!formattedProjects || formattedProjects.length === 0) return null;

  return (
    <Container className="space-y-8">
      <Container className="flex justify-between">
        <PageTitle title="Daniel's Projects" />
        <PageControls>
          <SearchForm />
          <Button size="sm" asChild>
            <Link to="/app/dashboard/projects/create">New Project</Link>
          </Button>
        </PageControls>
      </Container>
      <ProjectCards projects={formattedProjects} />
    </Container>
  );
}
