import TmsTable from "@/components/ProjectDashboard/Tms/TmsTable";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import PageTitle from "../../ui/PageTitle";
import SearchForm from "../../ui/SearchForm";
import { Button } from "../../ui/button";
import { Link } from "react-router";
import Container from "@/components/ui/Container";
import PageControls from "@/components/ui/PageControls";
import { useTms } from "@/hooks/useTms";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function Tms() {
  const { projectId, navigateToTm } = useTranslationRoute();
  const { tms } = useTms();

  if (!projectId) return null;

  return (
    <>
      <Container className="flex justify-between mb-6">
        <PageTitle title="Translation Memory" />
        <PageControls>
          <SearchForm placeholder="Search TM entries" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm">
                Upload TM
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to={`/app/projects/${projectId}/tms/new`}>
                  Create new TM
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/app/projects/${projectId}/tms/upload`}>
                  Add to existing TM
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </PageControls>
      </Container>
      <TmsTable
        tms={tms}
        onClick={(tmId: number) => {
          if (!projectId || !tmId) return;
          navigateToTm(tmId);
        }}
      />
    </>
  );
}
