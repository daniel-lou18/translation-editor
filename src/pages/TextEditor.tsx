import Header from "@/components/ui/Header";
import MemoryMatches from "@/components/ui/MemoryMatches";
import { useMatches } from "@/hooks/useMatches";
import TranslationSegments from "@/components/ui/TranslationSegments";
import { useEditor } from "@/contexts/editorContext";
import ProgressBar from "@/components/ui/ProgressBar";
import Container from "@/components/ui/Container";

export default function TextEditor() {
  const { segments } = useEditor();
  const {
    data: matches,
    isPending,
    progress: { processedSegments, totalSegments, percentage },
  } = useMatches(segments);

  return (
    <Container className="min-h-screen bg-white">
      <Container className="mx-auto max-w-[1600px] p-6">
        <Header />
        <ProgressBar
          processedSegments={processedSegments}
          totalSegments={totalSegments}
          percentage={percentage}
        />
        <Container className="grid grid-cols-12 gap-6 relative overflow-visible">
          <TranslationSegments matches={matches} />
          <MemoryMatches matches={matches} isLoading={isPending} />
        </Container>
      </Container>
    </Container>
  );
}
