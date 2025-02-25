import TmsTable from "@/components/ProjectDashboard/Tms/TmsTable";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import PageTitle from "../../ui/PageTitle";
import SearchForm from "../../ui/SearchForm";
import { Button } from "../../ui/button";
import { Link } from "react-router";
import Container from "@/components/ui/Container";
import PageControls from "@/components/ui/PageControls";
import { useTms } from "@/hooks/useTms";

export default function Tms() {
  const { projectId, navigateToTm } = useTranslationRoute();
  const { documentPairs } = useTms();

  if (!projectId) return null;

  return (
    <>
      <Container className="flex justify-between mb-6">
        <PageTitle title="Translation Memory" />
        <PageControls>
          <SearchForm placeholder="Search TM entries" />
          <Button size="sm" asChild>
            <Link to={`/app/projects/${projectId}/tms/upload`}>
              Upload TM
            </Link>
          </Button>
        </PageControls>
      </Container>
      <TmsTable
        documentPairs={Object.values(documentPairs || {})}
        onClick={(documentPairId: number) => {
          if (!projectId || !documentPairId) return;
          navigateToTm(documentPairId);
        }}
      />
    </>
  );
}
