import { AppSidebar } from "@/components/TranslationsTable/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ProjectBreadcrumb from "./ProjectBreadcrumb";
import TranslationsTable from "./TranslationsTable";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import { formatTranslationsToTableRows } from "@/utils/helpers";

export default function TranslationsPage() {
  const { projects, currentProject, currentDocument, currentTranslations } =
    useCurrentProject();
  const { projectId, documentId, navigateToTranslation } =
    useTranslationRoute();

  const translations = formatTranslationsToTableRows(currentTranslations);

  if (!currentProject || !currentDocument) return null;

  return (
    <SidebarProvider>
      <AppSidebar projects={projects} currentProject={currentProject} />
      <SidebarInset className="bg-muted/20">
        <ProjectBreadcrumb
          projectName={currentProject.name}
          fileName={currentDocument.fileName}
        />
        <TranslationsTable
          translations={translations}
          onClick={(translationId: string) => {
            if (!projectId || !documentId) return;
            navigateToTranslation({ projectId, documentId, translationId });
          }}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
