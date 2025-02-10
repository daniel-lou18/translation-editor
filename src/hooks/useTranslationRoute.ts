import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";

export type NavigationParams = {
  projectId: string | number;
  documentId: string | number;
  translationId: string | number;
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
        `/app/projects/${projectId}
        }`
      );
    },
    [navigate]
  );

  const navigateToDocument = useCallback(
    (projectId: number | string, documentId: number | string) => {
      if (!projectId) {
        throw new Error("Project id is missing");
      }
      navigate(
        `/app/projects/${projectId}/documents/${documentId}/translations`
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
    navigateToDocument,
    navigateToProject,
  };
}
