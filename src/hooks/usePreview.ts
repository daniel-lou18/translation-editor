import { useQuery } from "@tanstack/react-query";
import { useRoute } from "./useRoute";
import { translationService } from "@/services/translationService";

export function usePreview(translationId?: string | number) {
  const { translationId: urlTranslationId } = useRoute();

  const translationIdToUse =
    translationId !== undefined ? translationId : urlTranslationId;

  const { data, isPending, error, isError } = useQuery({
    queryFn: () => {
      if (!translationIdToUse) {
        throw new Error("Translation ID is required");
      }
      return translationService.previewTranslation(String(translationIdToUse));
    },
    queryKey: ["preview", translationIdToUse],
    enabled: !!translationIdToUse,
  });

  return { html: data, isLoading: isPending, error, isError };
}
