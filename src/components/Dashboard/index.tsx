import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import ProjectCards from "@/components/Dashboard/ProjectCards";
import ProjectsPageHeader from "@/components/Dashboard/ProjectsPageHeader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useProjects } from "@/hooks/useProjects";

export default function Dashboard() {
  const { data: projects } = useProjects();

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="bg-muted/20">
        <ProjectsPageHeader />
        <ProjectCards projects={projects} />{" "}
      </SidebarInset>
    </SidebarProvider>
  );
}
