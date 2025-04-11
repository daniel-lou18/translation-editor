import { translationService } from "@/services/translationService";
import { SegmentUpdateDTO } from "@/types/Dtos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TranslationWithSegments, UpdatedId } from "@/types";
import { toast } from "sonner";

export function useSaveSegment() {
  const queryClient = useQueryClient();

  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ["save-segment"],
    mutationFn: (update: SegmentUpdateDTO) => updateSegment(update),
    onMutate: async ({ translationId, update }) => {
      await queryClient.cancelQueries({
        queryKey: ["segments", translationId],
      });

      const prevData = queryClient.getQueryData<TranslationWithSegments>([
        "segments",
        translationId,
      ]);
      if (!prevData) return undefined;

      const updatedSegmentIdx = prevData.segments.findIndex(
        (segment) => segment.sourceSegmentId === update.sourceSegmentId
      );
      if (updatedSegmentIdx === -1) return undefined;

      const updatedSegments = [...prevData.segments];
      updatedSegments[updatedSegmentIdx] = {
        ...updatedSegments[updatedSegmentIdx],
        ...update,
      };

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
      console.log("onSettled", data, variables, error, context);

      queryClient.invalidateQueries({
        queryKey: ["segments", context.translationId],
      });
      queryClient.refetchQueries({
        queryKey: ["segments", context.translationId],
      });
    },
  });

  async function updateSegment({
    translationId,
    update,
  }: SegmentUpdateDTO): Promise<UpdatedId> {
    if (!translationId) {
      throw new Error("Project or translation id is missing");
    }

    return await translationService.updateSegments(translationId, [update]);
  }

  return {
    mutate,
    savedSegmentIds: data || null,
    isLoading: isPending,
    isError,
    error,
  };
}
