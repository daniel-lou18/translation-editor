import { translationService } from "@/services/translationService";
import { useQuery } from "@tanstack/react-query";
import { useTranslationRoute } from "./useTranslationRoute";

export function useGetTranslationSegments() {
  const { translationId } = useTranslationRoute();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["segments", translationId],
    queryFn: () => getSegmentsData(translationId),
    enabled: !!translationId,
  });

  async function getSegmentsData(translationId: string | undefined) {
    if (!translationId) {
      throw new Error("Project or translation id is missing");
    }

    return translationService.getTranslation(translationId);
  }

  return {
    translation: data?.translation || null,
    segments: data?.segments || [],
    isLoading: isPending,
    isError,
    error,
  };
}
