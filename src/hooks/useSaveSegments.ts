import { translationService } from "@/services/translationService";
import { Update } from "@/types/Dtos";
import { useMutation } from "@tanstack/react-query";
import { useRoute } from "./useRoute";

export function useSaveSegments() {
  const { translationId } = useRoute();
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: (updates: Update[]) => updateSegments(translationId, updates),
  });

  async function updateSegments(
    translationId: string | undefined,
    updates: Update[]
  ) {
    if (!translationId) {
      throw new Error("Project or translation id is missing");
    }

    if (!updates?.length) {
      throw new Error("No segments to update");
    }

    return await translationService.updateSegments(translationId, updates);
  }

  return {
    mutate,
    savedSegmentIds: data || null,
    isLoading: isPending,
    isError,
    error,
  };
}
