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
import { TableRowMenuProps } from "../TableRowMenu";
import { useDeleteTm } from "@/hooks/useDeleteTm";

export default function Tms() {
  const { projectId, navigateToTm } = useTranslationRoute();
  const { tms } = useTms();
  const { mutate: deleteTm } = useDeleteTm();

  if (!projectId) return null;

  const onRowClick = (tmId: number) => {
    if (!projectId || !tmId) return;
    navigateToTm(tmId);
  };

  const tmsRowMenuData = {
    name: "tm",
    items: [
      {
        value: "View details",
        onClick: () => {},
      },
      {
        value: "Export",
        onClick: () => {},
      },
      {
        value: "Delete",
        onClick: (tmId: number) => {
          deleteTm(tmId);
        },
      },
    ],
  };

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
                <Link to={`/app/projects/${projectId}/tms/create`}>
                  Create new TM
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/app/projects/${projectId}/tms/add-segments`}>
                  Add segment pairs
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </PageControls>
      </Container>
      <TmsTable
        tms={tms}
        rowMenuConfig={tmsRowMenuData}
        onRowClick={onRowClick}
      />
    </>
  );
}
