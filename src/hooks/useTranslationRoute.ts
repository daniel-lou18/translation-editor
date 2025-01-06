import { useParams } from "react-router";

export function useTranslationRoute() {
  const { projectId, translationId } = useParams();

  return { projectId, translationId };
}
