import { useQuery } from "@tanstack/react-query";
import { useRoute } from "./useRoute";
import { translationService } from "@/services/translationService";

export function usePreview() {
  const { translationId } = useRoute();
  const { data, isPending, error, isError } = useQuery({
    queryFn: () => translationService.previewTranslation(translationId!),
    queryKey: ["preview", translationId],
    enabled: !!translationId,
  });

  return { html: data, isLoading: isPending, error, isError };
}
