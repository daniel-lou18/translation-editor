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
import { toCapitalCase } from "@/utils/formatters";
import { Home } from "lucide-react";
import { Link, useLocation } from "react-router";

export default function BreadcrumbLayout() {
  const { pathname } = useLocation();
  const pathParts = pathname.split("/").filter(Boolean);
  const pathPartsWithoutApp = pathParts.slice(1);

  function reconstructPath(part: string, index: number) {
    if (part === "dashboard") return "/app/dashboard/projects";
    return `/app/${pathPartsWithoutApp.slice(0, index + 1).join("/")}`;
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white">
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
          {pathPartsWithoutApp.map((part, index) =>
            index === pathPartsWithoutApp.length - 1 ? (
              <>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {toCapitalCase(pathPartsWithoutApp[index])}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : (
              <>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link to={reconstructPath(part, index)}>
                      {toCapitalCase(part)}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
