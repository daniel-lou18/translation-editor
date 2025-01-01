import Container from "@/components/ui/Container";
import { useEditor } from "@/contexts/editorContext";
import TranslationProgress from "./TranslationProgress";
import ProjectName from "./ProjectName";
import FileName from "./FileName";

export default function ProjectControls() {
  const { segments, getCompletedSegments } = useEditor();
  const totalSegments = segments.length;
  const completedSegments = getCompletedSegments();

  return (
    <Container className="flex items-center w-full gap-8 p-2 text-muted-foreground text-sm font-semibold">
      <ProjectName />
      <FileName />
      <TranslationProgress current={completedSegments} total={totalSegments} />
    </Container>
  );
}
