import { reformulationService } from "@/services/reformulationService";
import { LangCodesDomain } from "@/types";
import { TextSegment } from "@/types/Dtos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEditor } from "@/contexts/editorContextV1";

export function useImprove() {
  const { activeSegmentId } = useEditor();
  const queryClient = useQueryClient();

  const { isPending, error, isError, mutate } = useMutation({
    mutationFn: (params: { segment: TextSegment; metadata: LangCodesDomain }) =>
      reformulationService.getImprovedTranslation(
        params.segment,
        params.metadata
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["translation", activeSegmentId],
      });
      queryClient.setQueryData(["reformulation", activeSegmentId], data);
    },
  });

  const improvedTranslation = queryClient.getQueryData<string>([
    "reformulation",
    activeSegmentId,
  ]);

  return {
    improvedTranslation,
    error,
    isLoading: isPending,
    isError,
    mutate,
  };
}
