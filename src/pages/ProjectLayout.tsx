import DocumentsSidebar from "@/components/DocumentsOverview/DocumentsSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { Outlet } from "react-router";

export default function ProjectLayout() {
  const { projects, currentProject } = useCurrentProject();

  if (!currentProject) return null;

  return (
    <SidebarProvider>
      <DocumentsSidebar projects={projects} currentProject={currentProject} />
      <SidebarInset className="bg-muted/20">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
