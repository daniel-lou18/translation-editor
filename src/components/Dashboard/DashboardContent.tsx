import { ProjectWithDocsAndTrans } from "@/types";
import { formatProjectsToCards } from "@/utils/helpers";
import Container from "../ui/Container";
import PageTitle from "../ui/PageTitle";
import SearchForm from "../ui/SearchForm";
import { Button } from "../ui/button";
import ProjectCards from "./ProjectCards";
import { Link } from "react-router";

type DashboardContentProps = {
  projects: ProjectWithDocsAndTrans[] | undefined;
};

export default function DashboardContent({ projects }: DashboardContentProps) {
  const formattedProjects = formatProjectsToCards(projects);

  if (!formattedProjects || formattedProjects.length === 0) return null;

  return (
    <Container className="px-12 py-6 bg-muted/20">
      <PageTitle title="Daniel's Projects">
        <SearchForm />
        <Button size="sm" asChild>
          <Link to="#">New Project</Link>
        </Button>
      </PageTitle>
      <ProjectCards projects={formattedProjects} />
    </Container>
  );
}
