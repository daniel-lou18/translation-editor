import { useEditor } from "@/contexts/editorContext";
import TranslationProgress from "./TranslationProgress";
import SelectProject from "./SelectProject";
import { useRoute } from "@/hooks/useRoute";
import ProjectControlsSkeleton from "./ProjectControlsSkeleton";
import SelectTranslation from "./SelectTranslation";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import SelectDocument from "./SelectDocument";
import { useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import TopbarContainer from "@/components/ui/Editor/TopbarContainer";
import ErrorMessage from "@/components/ui/Error/ErrorMessage";
export default function ProjectControls() {
  const { segments, getCompletedSegments } = useEditor();
  const totalSegments = segments.length;
  const completedSegments = getCompletedSegments();
  const { navigateToTranslation } = useRoute();
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

  const renderControls = () => {
    if (isLoading) {
      return <ProjectControlsSkeleton />;
    }

    if (isError) {
      return <ErrorMessage error={error} />;
    }

    if (!projects || Object.keys(projects).length === 0) {
      return <ErrorMessage message="No projects available" />;
    }

    return (
      <>
        <SelectProject
          projects={projects || {}}
          currentProject={currentProject}
          onSelect={handleProjectSelect}
        />
        <Separator orientation="vertical" className="h-6" />
        <SelectDocument
          documents={currentDocuments || {}}
          currentDocument={currentDocument}
          onSelect={handleDocumentSelect}
        />
        <Separator orientation="vertical" className="h-6" />
        <SelectTranslation
          currentDocument={currentDocument}
          translations={currentTranslations || {}}
          currentTranslation={currentTranslation}
          onSelect={handleTranslationSelect}
        />
        <Separator orientation="vertical" className="h-6" />
        <TranslationProgress
          current={completedSegments}
          total={totalSegments}
        />
      </>
    );
  };

  return <TopbarContainer>{renderControls()}</TopbarContainer>;
}
