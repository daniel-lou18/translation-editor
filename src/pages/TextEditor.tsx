import MemoryMatches from "@/components/ui/MemoryMatches";
import { useMatches } from "@/hooks/useMatches";
import TranslationSegments from "@/components/ui/TranslationSegments";
import { useEditor } from "@/contexts/editorContext";
import Container from "@/components/ui/Container";
import EditorControls from "@/components/ui/EditorControls";
import ProjectControls from "@/components/ui/ProjectControls";
import SideMenu from "@/components/ui/SideMenu";
import { useQuery } from "@tanstack/react-query";
import ReformulationMatches from "@/components/ui/ReformulationMatches";
import { Translations } from "@/types";

export default function TextEditor() {
  const { segments, getActiveSegment } = useEditor();
  const activeSegment = getActiveSegment();
  const { data: matches, isPending, progress } = useMatches(segments);
  const { data: reformulations } = useQuery<Translations>({
    queryKey: ["reformulation"],
    enabled: false,
  });
  const reformulation = reformulations?.[activeSegment.id];

  return (
    <Container className="min-h-screen bg-gray-50/50">
      <Container className="mx-auto max-w-[1600px] p-6">
        <ProjectControls />
        <EditorControls />
        <Container className="grid grid-cols-12 gap-6 relative overflow-visible">
          <TranslationSegments matches={matches} />
          <SideMenu>
            <ReformulationMatches
              sourceText={activeSegment.source}
              reformulation={reformulation}
            />
            <MemoryMatches
              matches={matches}
              isLoading={isPending}
              progress={progress}
            />
          </SideMenu>
        </Container>
      </Container>
    </Container>
  );
}
