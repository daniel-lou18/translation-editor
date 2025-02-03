import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";

export type NavigationParams = {
  projectId: string;
  documentId: string;
  translationId: string;
};

export function useTranslationRoute() {
  const { projectId, documentId, translationId } = useParams();
  const navigate = useNavigate();

  const navigateToProject = useCallback(
    (projectId: number | string) => {
      if (!projectId) {
        throw new Error("Project id is missing");
      }
      navigate(
        `/app/projects/${
          typeof projectId === "number" ? projectId.toString() : projectId
        }`
      );
    },
    [navigate]
  );

  const navigateToTranslation = useCallback(
    ({ projectId, documentId, translationId }: NavigationParams) => {
      if (!projectId || !documentId || !translationId) {
        throw new Error("Id(s) is/are missing");
      }
      navigate(
        `/app/projects/${projectId}/documents/${documentId}/translations/${translationId}`
      );
    },
    [navigate]
  );

  return {
    projectId,
    documentId,
    translationId,
    navigateToTranslation,
    navigateToProject,
  };
}
