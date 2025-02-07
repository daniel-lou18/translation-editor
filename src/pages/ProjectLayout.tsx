import DocumentsSidebar from "@/components/ProjectDashboard/DocumentsOverview/DocumentsSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { Outlet } from "react-router";
import Container from "@/components/ui/Container";
import TranslationsBreadcrumb from "@/components/ProjectDashboard/Translations/TranslationsBreadcrumb";

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
        <Container className="xl:px-12 min-[1600px]:px-24 py-6">
          <Outlet />
        </Container>
      </SidebarInset>
    </SidebarProvider>
  );
}
