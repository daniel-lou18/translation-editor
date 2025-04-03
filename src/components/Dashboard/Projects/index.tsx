import { formatProjectsToCards } from "@/utils/helpers";
import Container from "../../ui/Container";
import PageTitle from "../../ui/PageTitle";
import SearchForm from "../../ui/SearchForm";
import { Button } from "../../ui/button";
import ProjectCards from "./ProjectCards";
import { Link } from "react-router";
import PageControls from "../../ui/PageControls";
import { useProjects } from "@/hooks/useProjects";
import { Folders } from "lucide-react";

export default function DashboardProjects() {
  const { data: projects } = useProjects();

  const formattedProjects = formatProjectsToCards(projects);

  if (!formattedProjects || formattedProjects.length === 0) return null;

  const title = (
    <>
      <Folders size={24} strokeWidth={1.5} /> My Projects
    </>
  );

  return (
    <Container className="space-y-8">
      <PageTitle title={title}>
        <PageControls>
          <SearchForm placeholder="Search projects" />
          <Button size="sm" asChild>
            <Link to="/app/dashboard/projects/create">New Project</Link>
          </Button>
        </PageControls>
      </PageTitle>
      <ProjectCards projects={formattedProjects} />
    </Container>
  );
}
