import { useEditor } from "@/contexts/editorContext";
import TranslationProgress from "./TranslationProgress";
import SelectProject from "./SelectProject";
import { useRoute } from "@/hooks/useRoute";
import DataHandler from "@/components/ui/DataHandler";
import ProjectControlsSkeleton from "./ProjectControlsSkeleton";
import SelectTranslation from "./SelectTranslation";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import SelectDocument from "./SelectDocument";
import { useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import TopbarContainer from "@/components/ui/Editor/TopbarContainer";

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

  return (
    <TopbarContainer>
      <DataHandler
        loading={{
          isLoading,
          component: <ProjectControlsSkeleton />,
        }}
        error={{
          isError,
          error,
        }}
        empty={{
          isEmpty: !projects || Object.keys(projects).length === 0,
          component: (
            <div className="p-4 text-sm text-muted-foreground">
              No projects available
            </div>
          ),
        }}
      >
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
      </DataHandler>
      <Separator orientation="vertical" className="h-6" />
      <TranslationProgress current={completedSegments} total={totalSegments} />
    </TopbarContainer>
  );
}
