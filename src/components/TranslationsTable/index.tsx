import TranslationsSidebar from "./TranslationsSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import TranslationsBreadcrumb from "./TranslationsBreadcrumb";
import TranslationsTable from "./TranslationsTable";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import { formatTranslationsToTableRows } from "@/utils/helpers";

export default function TranslationsPage() {
  const { projects, currentProject, currentDocument, currentTranslations } =
    useCurrentProject();
  const { navigateToTranslation } = useTranslationRoute();

  const translations = formatTranslationsToTableRows(currentTranslations);

  if (!currentProject || !currentDocument) return null;

  return (
    <SidebarProvider>
      <TranslationsSidebar
        projects={projects}
        currentProject={currentProject}
      />
      <SidebarInset className="bg-muted/20">
        <TranslationsBreadcrumb
          projectId={currentProject.id}
          projectName={currentProject.name}
          fileName={currentDocument.fileName}
        />
        <TranslationsTable
          translations={translations}
          onClick={(translationId: string) => {
            navigateToTranslation({
              projectId: currentProject.id,
              documentId: currentDocument.id,
              translationId,
            });
          }}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
