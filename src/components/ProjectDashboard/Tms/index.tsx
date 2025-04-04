import TmsTable from "@/components/ProjectDashboard/Tms/TmsTable";
import { useRoute } from "@/hooks/useRoute";
import PageTitle from "../../ui/PageTitle";
import SearchForm from "../../ui/SearchForm";
import { Button } from "../../ui/button";
import { Link, useNavigate } from "react-router";
import Container from "@/components/ui/Container";
import PageControls from "@/components/ui/PageControls";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Layers } from "lucide-react";

export default function Tms() {
  const navigate = useNavigate();
  const { projectId } = useRoute();

  if (!projectId) {
    navigate("/app/dashboard/tms");
  }

  const title = (
    <>
      <Layers size={22} strokeWidth={1.5} />
      Translation Memory
    </>
  );

  return (
    <Container>
      <PageTitle title={title}>
        <PageControls>
          <SearchForm
            placeholder="Search TM entries"
            value={""}
            onChange={() => {}}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm">
                Upload TM
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link
                  to={
                    projectId
                      ? `/app/projects/${projectId}/tms/create`
                      : "/app/dashboard/tms/create"
                  }
                >
                  Create new TM
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to={
                    projectId
                      ? `/app/projects/${projectId}/tms/add-segments`
                      : "/app/dashboard/tms/add-segments"
                  }
                >
                  Add segment pairs
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </PageControls>
      </PageTitle>
      <TmsTable />
    </Container>
  );
}
