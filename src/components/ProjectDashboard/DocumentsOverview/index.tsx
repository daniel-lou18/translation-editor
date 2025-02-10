import DocumentsTable from "@/components/ProjectDashboard/DocumentsOverview/DocumentsTable";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import PageTitle from "../../ui/PageTitle";
import SearchForm from "../../ui/SearchForm";
import { Button } from "../../ui/button";
import { Link } from "react-router";
import Container from "@/components/ui/Container";
import PageControls from "@/components/ui/PageControls";

export default function Documents() {
  const { currentProject, currentDocuments } = useCurrentProject();
  const { projectId, navigateToDocument } = useTranslationRoute();

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
      <DocumentsTable
        documents={Object.values(currentDocuments || {})}
        onClick={(documentId: number) => {
          if (!projectId || !documentId) return;
          navigateToDocument(projectId, documentId);
        }}
      />
    </>
  );
}
