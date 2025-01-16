import Container from "@/components/ui/Container";
import { useEditor } from "@/contexts/editorContext";
import TranslationProgress from "./TranslationProgress";
import SelectProject from "./SelectProject";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import DataHandler from "@/components/ui/DataHandler";
import ProjectControlsSkeleton from "./ProjectControlsSkeleton";
import { BrainCircuit } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import SelectTranslation from "./SelectTranslation";

export default function ProjectControls() {
  const { segments, getCompletedSegments } = useEditor();
  const totalSegments = segments.length;
  const completedSegments = getCompletedSegments();
  const { projectId, translationId } = useTranslationRoute();
  const { projects, isLoading, isError, error } = useProjects();
  const translations =
    projects && projectId
      ? projects.filter((project) => project.id === parseInt(projectId))[0]
          .translations
      : null;

  return (
    <Container className="flex items-center w-full gap-12 text-muted-foreground font-semibold">
      <BrainCircuit className="text-cat-accent ml-2" size={20} />

      <DataHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
        loadingComponent={<ProjectControlsSkeleton />}
      >
        <SelectProject projects={projects || []} />
        <SelectTranslation translations={translations || []} />
      </DataHandler>
      <TranslationProgress current={completedSegments} total={totalSegments} />
    </Container>
  );
}
