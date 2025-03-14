import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import Container from "../ui/Container";
import BreadcrumbLayout from "../ProjectDashboard/Translations/BreadcrumbLayout";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="bg-muted/20">
        <BreadcrumbLayout />
        <Container className="xl:px-12 min-[1600px]:px-24 py-6">
          <Outlet />
        </Container>
      </SidebarInset>
    </SidebarProvider>
  );
}
