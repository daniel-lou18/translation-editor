import DocumentsBreadcrumb from "@/components/DocumentsTable/DocumentsBreadcrumb";
import DocumentsTable from "@/components/DocumentsTable/DocumentsTable";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";

export default function DocumentsPage() {
  const { currentProject, currentDocuments } = useCurrentProject();
  const { projectId, navigateToDocument } = useTranslationRoute();

  if (!currentProject) return null;

  return (
    <>
      <DocumentsBreadcrumb projectName={currentProject.name} />
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
