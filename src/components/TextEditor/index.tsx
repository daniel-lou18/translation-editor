import TranslationSegments from "@/components/TextEditor/Segments/TranslationSegments";
import { useEditor } from "@/contexts/editorContext";
import Container from "@/components/ui/Container";
import EditorControls from "@/components/TextEditor/EditorControls/EditorControls";
import ProjectControls from "@/components/TextEditor/ProjectControls";
import SideMenu from "./SideMenu";
import { useQuery } from "@tanstack/react-query";
import ReformulationMatches from "@/components/TextEditor/ReformulationMatches/ReformulationMatches";
import { Translations } from "@/types";
import { useSemanticMatches } from "@/hooks/useSemanticMatches";
import MemoryMatches from "./MemoryMatches/MemoryMatches";
import DataHandler from "../ui/DataHandler";

export default function TextEditor() {
  const { getActiveSegment } = useEditor();
  const activeSegment = getActiveSegment();
  const { matches, isPending, isError, error } =
    useSemanticMatches(activeSegment);
  const { data: reformulations } = useQuery<Translations>({
    queryKey: ["reformulation"],
    enabled: false,
  });
  const reformulation = reformulations?.[activeSegment.id];

  return (
    <>
      <Container className="sticky top-0 z-10 bg-gray-50 p-4 space-y-2">
        <ProjectControls />
        <EditorControls />
      </Container>
      <Container className="mx-auto max-w-[1600px] px-4 grid grid-cols-12 gap-6 relative overflow-visible">
        <TranslationSegments matches={matches} />
        <SideMenu>
          <ReformulationMatches
            sourceText={activeSegment.sourceText}
            reformulation={reformulation}
          />
          <DataHandler isLoading={isPending} isError={isError} error={error}>
            <MemoryMatches matches={matches} />
          </DataHandler>
        </SideMenu>
      </Container>
    </>
  );
}
