import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import DashboardContent from "@/components/Dashboard/DashboardContent";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useProjects } from "@/hooks/useProjects";

export default function Dashboard() {
  const { data: projects } = useProjects();

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="bg-muted/20">
        <DashboardHeader />
        <DashboardContent projects={projects} />
      </SidebarInset>
    </SidebarProvider>
  );
}
