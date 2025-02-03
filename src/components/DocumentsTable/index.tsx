import { AppSidebar } from "./app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ProjectBreadcrumb from "./ProjectBreadcrumb";
import DocumentsTable from "./DocumentsTable";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";

export default function DocumentsPage() {
  const { projects, currentProject, currentDocuments } = useCurrentProject();
  const { projectId, documentId, navigateToTranslation } =
    useTranslationRoute();

  if (!currentProject) return null;

  return (
    <SidebarProvider>
      <AppSidebar projects={projects} currentProject={currentProject} />
      <SidebarInset className="bg-muted/20">
        <ProjectBreadcrumb projectName={currentProject.name} />
        <DocumentsTable
          documents={Object.values(currentDocuments || {})}
          onClick={(translationId: string) => {
            if (!projectId || !documentId) return;
            navigateToTranslation({ projectId, documentId, translationId });
          }}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
