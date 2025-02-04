import DocumentsBreadcrumb from "@/components/DocumentsOverview/DocumentsBreadcrumb";
import DocumentsTable from "@/components/DocumentsOverview/DocumentsTable";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import Container from "../ui/Container";
import PageTitle from "../ui/PageTitle";
import SearchForm from "../ui/SearchForm";
import { Button } from "../ui/button";

export default function Documents() {
  const { currentProject, currentDocuments } = useCurrentProject();
  const { projectId, navigateToDocument } = useTranslationRoute();

  if (!currentProject) return null;

  return (
    <>
      <DocumentsBreadcrumb projectName={currentProject.name} />
      <Container className="px-12 py-6">
        <PageTitle title="Documents">
          <SearchForm />
          <Button size="sm">Upload Document</Button>
        </PageTitle>
        <DocumentsTable
          documents={Object.values(currentDocuments || {})}
          onClick={(documentId: number) => {
            if (!projectId || !documentId) return;
            navigateToDocument(projectId, documentId);
          }}
        />
      </Container>
    </>
  );
}
