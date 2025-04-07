import { translationService } from "@/services/translationService";
import { Update } from "@/types/Dtos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute } from "./useRoute";
import { UpdatedId } from "@/types";

export function useSaveSegments() {
  const { translationId } = useRoute();
  const queryClient = useQueryClient();

  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ["save-segments", translationId],
    mutationFn: (updates: Update[]) => updateSegments(translationId, updates),
    onSuccess: ({ translationId }) => {
      queryClient.invalidateQueries({
        queryKey: ["segments", translationId],
      });
    },
  });

  async function updateSegments(
    translationId: string | undefined,
    updates: Update[]
  ): Promise<UpdatedId> {
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
