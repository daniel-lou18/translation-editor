import { translationService } from "@/services/translationService";
import { SegmentUpdate } from "@/types/Dtos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute } from "./useRoute";
import { TranslationWithSegments, UpdatedId } from "@/types";
import { toast } from "sonner";

export function useSaveSegments() {
  const { translationId } = useRoute();
  const queryClient = useQueryClient();

  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ["save-segments", translationId],
    mutationFn: (segmentUpdates: SegmentUpdate[]) =>
      updateSegments(translationId, segmentUpdates),
    onMutate: async (segmentUpdates) => {
      if (!translationId) return;

      await queryClient.cancelQueries({
        queryKey: ["segments", translationId],
      });

      const prevData = queryClient.getQueryData<TranslationWithSegments>([
        "segments",
        translationId,
      ]);
      if (!prevData) return undefined;

      const updatedSegments = prevData.segments.map((segment) => {
        const update = segmentUpdates.find(
          (update) => update.sourceSegmentId === segment.sourceSegmentId
        );
        if (!update) return segment;
        return { ...segment, ...update };
      });

      queryClient.setQueryData<TranslationWithSegments>(
        ["segments", translationId],
        (prevState) => {
          if (!prevState) return prevData;

          return { ...prevState, segments: updatedSegments };
        }
      );

      return { prevData };
    },
    onError: (err, _, context) => {
      if (!context) return;
      queryClient.setQueryData<TranslationWithSegments>(
        ["segments", translationId],
        context.prevData
      );
      console.error("Failed to save segment", err);
      toast.error("Failed to save segment");
    },
    onSettled: () => {
      if (!translationId) return;
      queryClient.invalidateQueries({
        queryKey: ["segments", translationId],
      });
    },
  });

  async function updateSegments(
    translationId: string | undefined,
    updates: SegmentUpdate[]
  ): Promise<UpdatedId> {
    if (!translationId) {
      throw new Error("Project or translation id is missing");
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
