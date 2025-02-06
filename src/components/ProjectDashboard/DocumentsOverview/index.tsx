import DocumentsTable from "@/components/ProjectDashboard/DocumentsOverview/DocumentsTable";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import PageTitle from "../../ui/PageTitle";
import SearchForm from "../../ui/SearchForm";
import { Button } from "../../ui/button";
import { Link } from "react-router";

export default function Documents() {
  const { currentProject, currentDocuments } = useCurrentProject();
  const { projectId, navigateToDocument } = useTranslationRoute();

  if (!currentProject) return null;

  return (
    <>
      <PageTitle title="Documents">
        <SearchForm placeholder="Search documents" />
        <Button size="sm" asChild>
          <Link to={`/app/projects/${currentProject.id}/documents/upload`}>
            Upload Document
          </Link>
        </Button>
      </PageTitle>
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
