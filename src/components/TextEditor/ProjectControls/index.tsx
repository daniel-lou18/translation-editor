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
import { useCallback } from "react";

export default function ProjectControls() {
  const { segments, getCompletedSegments } = useEditor();
  const totalSegments = segments.length;
  const completedSegments = getCompletedSegments();
  const { navigateToTranslation } = useTranslationRoute();
  const {
    projects,
    currentProject,
    currentDocuments,
    currentDocument,
    currentTranslations,
    currentTranslation,
    isLoading,
    isError,
    error,
  } = useCurrentProject();

  const handleProjectSelect = useCallback(
    (projectId: string) => {
      if (!projectId || !projects) return;

      navigateToTranslation({
        projectId,
        documentId: projects[projectId].documents[0].id.toString(),
        translationId:
          projects[projectId].documents[0].translations[0].id.toString(),
      });
    },
    [projects, navigateToTranslation]
  );

  const handleDocumentSelect = useCallback(
    (documentId: string) => {
      if (!currentDocument || !currentDocuments) return;

      const translationId =
        currentDocuments[documentId].translations[0].id.toString();

      navigateToTranslation({
        projectId: currentDocument.projectId.toString(),
        documentId,
        translationId,
      });
    },
    [currentDocuments, currentDocument, navigateToTranslation]
  );

  const handleTranslationSelect = useCallback(
    (translationId: string) => {
      if (!currentDocument?.translations) return;

      navigateToTranslation({
        projectId: currentDocument.projectId.toString(),
        documentId: currentDocument.id.toString(),
        translationId,
      });
    },
    [
      currentDocument?.id,
      currentDocument?.projectId,
      currentDocument?.translations,
      navigateToTranslation,
    ]
  );

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
          onSelect={handleProjectSelect}
        />
        <SelectDocument
          documents={currentDocuments || {}}
          currentDocument={currentDocument}
          onSelect={handleDocumentSelect}
        />
        <SelectTranslation
          currentDocument={currentDocument}
          translations={currentTranslations || {}}
          currentTranslation={currentTranslation}
          onSelect={handleTranslationSelect}
        />
      </DataHandler>
      <TranslationProgress current={completedSegments} total={totalSegments} />
    </Container>
  );
}
