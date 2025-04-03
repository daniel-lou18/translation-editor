import DocumentsSidebar from "@/components/ProjectDashboard/Layout/DocumentsSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { Outlet } from "react-router";
import Container from "@/components/ui/Container";

import Navbar from "../ui/Layout/Navbar";

export default function ProjectLayout() {
  const { projects, currentProject } = useCurrentProject();

  if (!currentProject) return null;

  return (
    <SidebarProvider>
      <DocumentsSidebar projects={projects} currentProject={currentProject} />
      <SidebarInset className="bg-muted/20">
        <Navbar />
        <Container className="px-6 xl:px-12 min-[1600px]:px-24 py-6">
          <Outlet />
        </Container>
      </SidebarInset>
    </SidebarProvider>
  );
}
