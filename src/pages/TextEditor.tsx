import MemoryMatches from "@/components/ui/MemoryMatches";
import { useMatches } from "@/hooks/useMatches";
import TranslationSegments from "@/components/ui/TranslationSegments";
import { useEditor } from "@/contexts/editorContext";
import Container from "@/components/ui/Container";
import EditorControls from "@/components/ui/EditorControls";
import ProjectControls from "@/components/ui/ProjectControls";

export default function TextEditor() {
  const { segments } = useEditor();
  const { data: matches, isPending, progress } = useMatches(segments);
  // console.log({ segments });

  return (
    <Container className="min-h-screen bg-gray-50/50">
      <Container className="mx-auto max-w-[1600px] p-6">
        <ProjectControls />
        <EditorControls />
        <Container className="grid grid-cols-12 gap-6 relative overflow-visible">
          <TranslationSegments matches={matches} />
          <MemoryMatches
            matches={matches}
            isLoading={isPending}
            progress={progress}
          />
        </Container>
      </Container>
    </Container>
  );
}
