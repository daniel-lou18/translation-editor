import DocumentsTable from "@/components/ProjectDashboard/Documents/DocumentsTable";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import PageTitle from "../../ui/PageTitle";
import SearchForm from "../../ui/SearchForm";
import { Button } from "../../ui/button";
import { Link } from "react-router";
import Container from "@/components/ui/Container";
import PageControls from "@/components/ui/PageControls";

export default function Documents() {
  const { currentProject } = useCurrentProject();

  if (!currentProject) return null;

  return (
    <>
      <Container className="flex justify-between mb-6">
        <PageTitle title="Documents" />
        <PageControls>
          <SearchForm placeholder="Search documents" />
          <Button size="sm" asChild>
            <Link to={`/app/projects/${currentProject.id}/documents/upload`}>
              Upload Document
            </Link>
          </Button>
        </PageControls>
      </Container>
      <DocumentsTable />
    </>
  );
}
