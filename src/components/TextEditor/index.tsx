import TranslationSegments from "@/components/TextEditor/Segments/TranslationSegments";
import { useEditor } from "@/contexts/editorContext";
import Container from "@/components/ui/Container";
import EditorControls from "@/components/TextEditor/EditorControls/EditorControls";
import ProjectControls from "@/components/TextEditor/ProjectControls";
import SideMenu from "./SideMenu";
import ReformulationMatches from "@/components/TextEditor/SideMenu/ReformulationMatches";
import { useSemanticMatches } from "@/hooks/useSemanticMatches";
import MemoryMatches from "./SideMenu/MemoryMatches";
import DataHandler from "../ui/DataHandler";
import MatchSkeletons from "./SideMenu/MatchSkeletons";
import { useReformulate } from "@/hooks/useReformulate";

export default function TextEditor() {
  const { getActiveSegment } = useEditor();
  const activeSegment = getActiveSegment();
  const {
    matches,
    isPending: isLoadingMatches,
    isError,
    error,
  } = useSemanticMatches(activeSegment);
  const { reformulation, isLoading: isLoadingReformulation } = useReformulate(
    activeSegment.id
  );

  return (
    <>
      <Container className="sticky top-0 z-10 bg-gray-50 p-4 space-y-2">
        <ProjectControls />
        <EditorControls />
      </Container>
      <Container className="px-4 grid grid-cols-12 gap-6 relative overflow-visible">
        <TranslationSegments matches={matches} />
        <SideMenu>
          <DataHandler
            isLoading={isLoadingMatches || isLoadingReformulation}
            isError={isError}
            error={error}
            errorComponent={
              <p className="text-sm text-muted-foreground">No matches found</p>
            }
            loadingComponent={<MatchSkeletons />}
          >
            <ReformulationMatches
              sourceText={activeSegment.sourceText}
              reformulation={reformulation}
            />
            <MemoryMatches matches={matches} />
          </DataHandler>
        </SideMenu>
      </Container>
    </>
  );
}
