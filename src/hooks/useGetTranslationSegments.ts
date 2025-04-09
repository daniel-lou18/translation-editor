import { translationService } from "@/services/translationService";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "./useRoute";

export function useGetTranslationSegments() {
  const { translationId } = useRoute();
  const { data, isPending, isError, error, dataUpdatedAt } = useQuery({
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
    document: data?.document || null,
    translation: data?.translation || null,
    segments: data?.segments || [],
    isLoading: isPending,
    isError,
    error,
    dataUpdatedAt,
  };
}
