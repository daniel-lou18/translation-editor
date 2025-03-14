import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import Container from "../ui/Container";

export default function DashboardHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Container className="flex items-center text-sm">
        <Home size={16} className="mr-1" /> Home
      </Container>
    </header>
  );
}
