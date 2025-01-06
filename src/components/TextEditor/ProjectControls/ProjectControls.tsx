import Container from "@/components/ui/Container";
import { useEditor } from "@/contexts/editorContext";
import TranslationProgress from "./TranslationProgress";
import ProjectName from "./ProjectName";
import FileName from "./FileName";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";

export default function ProjectControls() {
  const { segments, getCompletedSegments } = useEditor();
  const totalSegments = segments.length;
  const completedSegments = getCompletedSegments();
  const { projectId, translationId } = useTranslationRoute();

  return (
    <Container className="flex items-center w-full gap-8 p-2 text-muted-foreground font-semibold">
      <ProjectName projectName={`Project ${projectId}`} />
      <FileName fileName={`Translation ${translationId}`} />
      <TranslationProgress current={completedSegments} total={totalSegments} />
    </Container>
  );
}
