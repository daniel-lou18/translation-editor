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
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { toCapitalCase } from "@/utils/formatters";
import {
  partUrlMap,
  reconstructPath,
  replaceIdsWithNames,
} from "@/utils/helpers";
import { Home } from "lucide-react";
import { Link, useLocation } from "react-router";
import Container from "../Container";

export default function BreadcrumbLayout() {
  const { pathname } = useLocation();
  const { currentProject, currentDocument, currentTranslation } =
    useCurrentProject();

  const pathParts = pathname.split("/").filter(Boolean).slice(1);
  const displayedPathParts = replaceIdsWithNames(pathParts, {
    currentProject,
    currentDocument,
    currentTranslation,
  });

  return (
    <Container className="flex items-center gap-2">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink asChild className="flex items-center">
              <Link to="/app/dashboard/projects">
                <Home size={16} className="mr-1" /> Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {displayedPathParts.map((part, index, parts) =>
            index === parts.length - 1 ? (
              <Container key={part} className="flex items-center gap-2">
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {toCapitalCase(displayedPathParts[index])}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </Container>
            ) : (
              <Container key={part} className="flex items-center gap-2">
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link
                      to={reconstructPath(part, index, pathParts, partUrlMap)}
                    >
                      {toCapitalCase(part)}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Container>
            )
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </Container>
  );
}
