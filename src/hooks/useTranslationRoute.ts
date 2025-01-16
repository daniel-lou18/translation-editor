import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";

export function useTranslationRoute() {
  const { projectId, translationId } = useParams();
  const navigate = useNavigate();

  const navigateToTranslation = useCallback(
    (projectId: string, translationId: string) => {
      navigate(`/app/projects/${projectId}/translations/${translationId}`);
    },
    [navigate]
  );

  return { projectId, translationId, navigateToTranslation };
}
