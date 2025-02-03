import DocumentsSidebar from "./DocumentsSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ProjectBreadcrumb from "./DocumentsBreadcrumb";
import DocumentsTable from "./DocumentsTable";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";

export default function DocumentsPage() {
  const { projects, currentProject, currentDocuments } = useCurrentProject();
  const { projectId, navigateToDocument } = useTranslationRoute();

  if (!currentProject) return null;

  return (
    <SidebarProvider>
      <DocumentsSidebar projects={projects} currentProject={currentProject} />
      <SidebarInset className="bg-muted/20">
        <ProjectBreadcrumb projectName={currentProject.name} />
        <DocumentsTable
          documents={Object.values(currentDocuments || {})}
          onClick={(documentId: number) => {
            if (!projectId || !documentId) return;
            navigateToDocument(projectId, documentId);
          }}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
