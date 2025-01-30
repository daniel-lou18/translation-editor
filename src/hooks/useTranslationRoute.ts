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

  return { projectId, documentId, translationId, navigateToTranslation };
}
