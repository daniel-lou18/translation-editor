import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import ProjectCards from "./ProjectCards";
import { useProjects } from "@/hooks/useProjects";
import ProjectsPageHeader from "./ProjectsPageHeader";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardPage() {
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
