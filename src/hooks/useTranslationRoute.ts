import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";

export function useTranslationRoute() {
  const { projectId, documentId, translationId } = useParams();
  const navigate = useNavigate();

  const navigateToTranslation = useCallback(
    (projectId: string, documentId: string, translationId: string) => {
      navigate(
        `/app/projects/${projectId}/documents/${documentId}/translations/${translationId}`
      );
    },
    [navigate]
  );

  return { projectId, documentId, translationId, navigateToTranslation };
}
