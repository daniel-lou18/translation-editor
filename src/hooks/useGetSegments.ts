import { translationService } from "@/services/translationService";
import { useQuery } from "@tanstack/react-query";
import { useTranslationRoute } from "./useTranslationRoute";

export function useGetSegments() {
  const { translationId } = useTranslationRoute();
  console.log({ translationId });
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["segments", translationId],
    queryFn: () => getSegmentsData(translationId),
    enabled: !!translationId,
  });

  async function getSegmentsData(translationId: string | undefined) {
    if (!translationId) {
      throw new Error("Project or translation id is missing");
    }

    const result = await translationService.getTranslation(translationId);
    return result.segments;
  }

  return { segments: data || null, isLoading: isPending, isError, error };
}
