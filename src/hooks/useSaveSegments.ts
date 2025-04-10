import { translationService } from "@/services/translationService";
import { SegmentUpdate, UpdateSegmentsDTO } from "@/types/Dtos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TranslationWithSegments, UpdatedId } from "@/types";
import { toast } from "sonner";

export function useSaveSegments() {
  const queryClient = useQueryClient();

  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ["save-segments"],
    mutationFn: ({ translationId, updates }: UpdateSegmentsDTO) =>
      updateSegments(translationId, updates),
    onMutate: async ({ translationId, updates }) => {
      await queryClient.cancelQueries({
        queryKey: ["segments", translationId],
      });

      const prevData = queryClient.getQueryData<TranslationWithSegments>([
        "segments",
        translationId,
      ]);
      if (!prevData) return undefined;

      const updatedSegments = prevData.segments.map((segment) => {
        const update = updates.find(
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

      return { translationId, prevData };
    },
    onError: (err, _, context) => {
      if (!context) return;
      queryClient.setQueryData<TranslationWithSegments>(
        ["segments", context.translationId],
        context.prevData
      );
      console.error("Failed to save segment", err);
      toast.error("Failed to save segment");
    },
    onSettled: (data, variables, error, context) => {
      if (!context) return;

      queryClient.invalidateQueries({
        queryKey: ["segments", context.translationId],
      });
      queryClient.refetchQueries({
        queryKey: ["segments", context.translationId],
      });
    },
  });

  async function updateSegments(
    translationId: number,
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
