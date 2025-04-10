import { useEditor } from "@/contexts/editorContextV1";
import TranslationProgress from "./TranslationProgress";
import SelectProject from "./SelectProject";
import { useRoute } from "@/hooks/useRoute";
import ProjectControlsSkeleton from "./ProjectControlsSkeleton";
import SelectTranslation from "./SelectTranslation";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import SelectDocument from "./SelectDocument";
import { useCallback } from "react";
import ErrorMessage from "@/components/ui/Error/ErrorMessage";
import Container from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/ui/Editor/Logo";

export default function ProjectControlsLeft() {
  const { segments, getCompletedSegments } = useEditor();
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
    <Container className="flex items-center gap-4">
      <Logo />
      <SelectProject
        projects={projects || {}}
        currentProject={currentProject}
        onSelect={handleProjectSelect}
      />
      <ArrowRight size={16} className="text-muted-foreground" />
      <SelectDocument
        documents={currentDocuments || {}}
        currentDocument={currentDocument}
        onSelect={handleDocumentSelect}
      />
      <ArrowRight size={16} className="text-muted-foreground" />
      <SelectTranslation
        currentDocument={currentDocument}
        translations={currentTranslations || {}}
        currentTranslation={currentTranslation}
        onSelect={handleTranslationSelect}
      />
      <Container className="flex items-center gap-6 ml-4">
        <TranslationProgress
          current={getCompletedSegments()}
          total={segments.length}
        />
      </Container>
    </Container>
  );
}
