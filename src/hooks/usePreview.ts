import { useQuery } from "@tanstack/react-query";
import { useTranslationRoute } from "./useTranslationRoute";
import { translationService } from "@/services/translationService";

export function usePreview() {
  const { translationId } = useTranslationRoute();
  const { data, isPending, error, isError } = useQuery({
    queryFn: () => translationService.previewTranslation(translationId!),
    queryKey: ["preview", translationId],
    enabled: !!translationId,
  });

  return { html: data, isLoading: isPending, error, isError };
}
