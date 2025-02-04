import DocumentsSidebar from "@/components/DocumentsOverview/DocumentsSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { Outlet } from "react-router";
import Container from "@/components/ui/Container";
import TranslationsBreadcrumb from "@/components/Translations/TranslationsBreadcrumb";

export default function ProjectLayout() {
  const { projects, currentProject, currentDocument } = useCurrentProject();

  if (!currentProject) return null;

  return (
    <SidebarProvider>
      <DocumentsSidebar projects={projects} currentProject={currentProject} />
      <SidebarInset className="bg-muted/20">
        <TranslationsBreadcrumb
          projectId={currentProject.id}
          projectName={currentProject.name}
          fileName={currentDocument?.fileName ?? null}
        />
        <Container className="px-12 py-6">
          <Outlet />
        </Container>
      </SidebarInset>
    </SidebarProvider>
  );
}
