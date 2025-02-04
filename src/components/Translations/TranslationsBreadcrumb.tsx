import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import { Link } from "react-router";

type TranslationsBreadCrumbProps = {
  projectId: number;
  projectName: string;
  fileName?: string | null;
};
export default function TranslationsBreadcrumb({
  projectId,
  projectName,
  fileName,
}: TranslationsBreadCrumbProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink asChild className="flex items-center">
              <Link to="/app/projects">
                <Home size={16} className="mr-1" /> Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink asChild>
              <Link to={`/app/projects/${String(projectId)}/documents`}>
                {projectName}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>{fileName ?? "All translations"}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
