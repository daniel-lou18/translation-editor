import { AppSidebar } from "@/components/ProjectsTable/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import ProjectBreadcrumb from "./ProjectBreadcrumb";
import TranslationsTable from "./TranslationsTable";

export default function DocumentsTable() {
  const {
    projects,
    currentProject,
    currentDocuments,
    currentDocument,
    currentTranslations,
    currentTranslation,
    isLoading,
    isError,
    error,
  } = useCurrentProject();

  if (!currentProject || !currentDocument) return null;

  return (
    <SidebarProvider>
      <AppSidebar projects={projects} currentProject={currentProject} />
      <SidebarInset className="bg-muted">
        <ProjectBreadcrumb
          projectName={currentProject.name}
          fileName={currentDocument.fileName}
        />
        <TranslationsTable />
      </SidebarInset>
    </SidebarProvider>
  );
}
