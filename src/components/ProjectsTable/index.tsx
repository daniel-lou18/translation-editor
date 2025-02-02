import { AppSidebar } from "@/components/ProjectsTable/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import ProjectBreadcrumb from "./ProjectBreadcrumb";
import TranslationsTable from "./TranslationsTable";

export default function DocumentsTable() {
  const { projects, currentProject, currentDocument, currentTranslations } =
    useCurrentProject();

  const translations = Object.values(currentTranslations || {}).map(
    (translation) => ({
      lang: translation.targetLang,
      status: translation.status,
      updatedAt: translation.updatedAt,
      progress: Math.round(
        (translation.targetSegments.filter((seg) => seg.status === "translated")
          .length /
          translation.targetSegments.length) *
          100
      ),
    })
  );

  console.log({ currentTranslations });

  if (!currentProject || !currentDocument) return null;

  return (
    <SidebarProvider>
      <AppSidebar projects={projects} currentProject={currentProject} />
      <SidebarInset className="bg-muted/50">
        <ProjectBreadcrumb
          projectName={currentProject.name}
          fileName={currentDocument.fileName}
        />
        <TranslationsTable translations={translations} />
      </SidebarInset>
    </SidebarProvider>
  );
}
