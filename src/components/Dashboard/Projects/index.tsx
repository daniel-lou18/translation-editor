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
import { ChangeEvent, useState } from "react";
import { useSearch } from "@/hooks/useSearch";

export default function DashboardProjects() {
  const { data: projects } = useProjects();
  const [searchQuery, setSearchQuery] = useState("");

  const formattedProjects = formatProjectsToCards(projects);
  if (!formattedProjects || formattedProjects.length === 0) return null;

  const filteredProjects = useSearch(
    formattedProjects,
    searchQuery,
    (project, query) =>
      project.name.toLowerCase().includes(query.trim().toLowerCase()) ||
      project.description?.toLowerCase().includes(query.trim().toLowerCase()) ||
      false
  );

  const title = (
    <>
      <Folders size={24} strokeWidth={1.5} /> My Projects
    </>
  );

  return (
    <Container className="space-y-8">
      <PageTitle title={title}>
        <PageControls>
          <SearchForm
            placeholder="Search projects"
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
          <Button size="sm" asChild>
            <Link to="/app/dashboard/projects/create">New Project</Link>
          </Button>
        </PageControls>
      </PageTitle>
      <ProjectCards projects={filteredProjects} />
    </Container>
  );
}
