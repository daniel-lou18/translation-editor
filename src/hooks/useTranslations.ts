import { translationService } from "@/services/translationService";
import { useQuery } from "@tanstack/react-query";

export function useTranslations(params?: {
  limit?: number;
  order_by?: string;
  order?: "asc" | "desc";
}) {
  const {
    data: translations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["translations"],
    queryFn: () =>
      translationService.getTranslations({
        limit: params?.limit ?? 3,
        order_by: params?.order_by ?? "updatedAt",
        order: params?.order ?? "desc",
      }),
  });

  return {
    translations: translations ?? [],
    isLoading,
    error,
  };
}
