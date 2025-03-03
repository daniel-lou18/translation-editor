import { reformulationService } from "@/services/reformulationService";
import { LangCodesDomain } from "@/types";
import { TextSegment } from "@/types/Dtos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useImprove(id: number) {
  const queryClient = useQueryClient();

  const { isPending, error, isError, mutate } = useMutation({
    mutationFn: (params: { segment: TextSegment; metadata: LangCodesDomain }) =>
      reformulationService.getImprovedTranslation(
        params.segment,
        params.metadata
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["translation", id],
      });
      queryClient.setQueryData(["reformulation", id], data);
    },
  });

  const improvedTranslation = queryClient.getQueryData<string>([
    "reformulation",
    id,
  ]);

  return {
    improvedTranslation,
    error,
    isLoading: isPending,
    isError,
    mutate,
  };
}
