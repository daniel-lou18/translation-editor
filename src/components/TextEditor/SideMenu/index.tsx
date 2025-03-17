import ReformulationMatches from "@/components/TextEditor/SideMenu/ReformulationMatches";
import MemoryMatches from "./MemoryMatches";
import DataHandler from "../../ui/DataHandler";
import MatchSkeletons from "./MatchSkeletons";
import { useEditor } from "@/contexts/editorContext";
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

  const ErrorComponent = (
    <p className="p-4 text-sm text-muted-foreground">
      Error: could not retrieve matches
    </p>
  );

  const EmptyMatchesComponent = (
    <p className="p-4 text-sm text-muted-foreground">
      No matches found for this segment
    </p>
  );

  const EmptyGlossaryComponent = (
    <p className="p-4 text-sm text-muted-foreground">
      No glossary terms found for this segment
    </p>
  );

  return (
    <Container className="col-span-3 sticky top-0 min-h-screen h-fit space-y-4 bg-background">
      {currentView === "tm" ? (
        <Container className="mt-4 px-4">
          <DataHandler
            data={{
              matches,
              reformulation,
            }}
            loading={{
              isLoading: isLoadingMatches || isLoadingReformulation,
              component: <MatchSkeletons />,
            }}
            error={{
              isError,
              error,
              component: ErrorComponent,
            }}
            empty={{
              isEmpty: !matches || matches.length === 0,
              component: EmptyMatchesComponent,
            }}
          >
            {(data) => (
              <>
                <ReformulationMatches
                  sourceText={activeSegment.sourceText}
                  reformulation={data.reformulation}
                />
                <MemoryMatches matches={data.matches} />
              </>
            )}
          </DataHandler>
        </Container>
      ) : (
        <Container className="mt-4 px-4">
          <DataHandler
            data={{
              glossaryData,
            }}
            loading={{
              isLoading: isLoadingGlossary,
              component: <GlossarySkeletons />,
            }}
            error={{
              isError: isGlossaryError,
              error: glossaryError,
              component: ErrorComponent,
            }}
            empty={{
              isEmpty: !glossaryData || glossaryData.length === 0,
              component: EmptyGlossaryComponent,
            }}
          >
            {(data) => <Glossary glossaryData={data.glossaryData || []} />}
          </DataHandler>
        </Container>
      )}
    </Container>
  );
}
