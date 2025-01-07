import Container from "@/components/ui/Container";
import { useEditor } from "@/contexts/editorContext";
import TranslationProgress from "./TranslationProgress";
import ProjectName from "./ProjectName";
import FileName from "./FileName";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import { useProject } from "@/hooks/useProject";
import DataHandler from "@/components/ui/DataHandler";
import ProjectControlsSkeleton from "./ProjectControlsSkeleton";

export default function ProjectControls() {
  const { segments, getCompletedSegments } = useEditor();
  const totalSegments = segments.length;
  const completedSegments = getCompletedSegments();
  const { projectId, translationId } = useTranslationRoute();
  const {
    projectData,
    translationData,
    isPending: isLoadingProject,
    isError: isErrorProject,
    error: errorProject,
  } = useProject(projectId, translationId);

  return (
    <Container className="flex items-center w-full gap-12 p-2 text-muted-foreground font-semibold">
      <DataHandler
        isLoading={isLoadingProject}
        isError={isErrorProject}
        error={errorProject}
        loadingComponent={<ProjectControlsSkeleton />}
      >
        <ProjectName projectName={projectData?.name || "New project"} />
        <FileName fileName={translationData?.fileName || "New file"} />
      </DataHandler>
      <TranslationProgress current={completedSegments} total={totalSegments} />
    </Container>
  );
}
