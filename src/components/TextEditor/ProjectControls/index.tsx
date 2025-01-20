import Container from "@/components/ui/Container";
import { useEditor } from "@/contexts/editorContext";
import TranslationProgress from "./TranslationProgress";
import SelectProject from "./SelectProject";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import DataHandler from "@/components/ui/DataHandler";
import ProjectControlsSkeleton from "./ProjectControlsSkeleton";
import { BrainCircuit } from "lucide-react";
import SelectTranslation from "./SelectTranslation";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import SelectDocument from "./SelectDocument";

export default function ProjectControls() {
  const { segments, getCompletedSegments } = useEditor();
  const totalSegments = segments.length;
  const completedSegments = getCompletedSegments();
  const { projectId, documentId, translationId, navigateToTranslation } =
    useTranslationRoute();
  const {
    projects,
    currentProject,
    currentDocuments,
    currentDocument,
    isLoading,
    isError,
    error,
  } = useCurrentProject(projectId, documentId, translationId);

  return (
    <Container className="flex items-center w-full gap-12 text-muted-foreground font-semibold">
      <BrainCircuit className="text-cat-accent ml-2" size={20} />

      <DataHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
        loadingComponent={<ProjectControlsSkeleton />}
      >
        <SelectProject
          projects={projects || {}}
          currentProject={currentProject}
          navigateTo={navigateToTranslation}
        />
        <SelectDocument
          documents={currentDocuments || {}}
          currentDocument={currentDocument}
          navigateTo={navigateToTranslation}
        />
        <SelectTranslation
          currentDocument={currentDocument}
          navigateTo={navigateToTranslation}
        />
      </DataHandler>
      <TranslationProgress current={completedSegments} total={totalSegments} />
    </Container>
  );
}
