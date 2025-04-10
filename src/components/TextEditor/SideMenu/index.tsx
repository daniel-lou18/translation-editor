import ReformulationMatches from "@/components/TextEditor/SideMenu/ReformulationMatches";
import MemoryMatches from "./MemoryMatches";
import MatchSkeletons from "./MatchSkeletons";
import { useEditor } from "@/contexts/editorContextV1";
import { useReformulate } from "@/hooks/useReformulate";
import { useSemanticMatches } from "@/hooks/useSemanticMatches";
import Glossary from "./Glossary";
import { useSearchGlossary } from "@/hooks/useSearchGlossary";
import GlossarySkeletons from "./GlossarySkeletons";
import Container from "@/components/ui/Container";
import { useResources } from "@/contexts/resourcesContext";

export default function SideMenu() {
  const { getActiveSegment } = useEditor();
  const activeSegment = getActiveSegment();
  const {
    matches,
    isPending: isLoadingMatches,
    isError,
    error,
  } = useSemanticMatches(activeSegment);
  const {
    glossaryData,
    isLoading: isLoadingGlossary,
    isError: isGlossaryError,
    error: glossaryError,
  } = useSearchGlossary(activeSegment.sourceText);
  const { reformulation, isLoading: isLoadingReformulation } = useReformulate();
  const { currentView } = useResources();

  // Translation Memory View
  const renderTMView = () => {
    if (isLoadingMatches || isLoadingReformulation) {
      return <MatchSkeletons />;
    }

    if (isError) {
      return (
        <p className="p-4 text-sm text-muted-foreground">
          Error: {error?.message || "could not retrieve matches"}
        </p>
      );
    }

    if (!matches || matches.length === 0) {
      return (
        <p className="p-4 text-sm text-muted-foreground">
          No matches found for this segment
        </p>
      );
    }

    return (
      <>
        <ReformulationMatches
          sourceText={activeSegment.sourceText}
          reformulation={reformulation}
        />
        <MemoryMatches matches={matches} />
      </>
    );
  };

  // Glossary View
  const renderGlossaryView = () => {
    if (isLoadingGlossary) {
      return <GlossarySkeletons />;
    }

    if (isGlossaryError) {
      return (
        <p className="p-4 text-sm text-muted-foreground">
          Error: {glossaryError?.message || "could not retrieve glossary terms"}
        </p>
      );
    }

    if (!glossaryData || glossaryData.length === 0) {
      return (
        <p className="p-4 text-sm text-muted-foreground">
          No glossary terms found for this segment
        </p>
      );
    }

    return <Glossary glossaryData={glossaryData} />;
  };

  return (
    <Container className="col-span-3 sticky top-0 min-h-screen h-fit space-y-4 bg-background">
      <Container className="mt-4 px-4">
        {currentView === "tm" ? renderTMView() : renderGlossaryView()}
      </Container>
    </Container>
  );
}
