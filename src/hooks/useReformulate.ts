import { reformulationService } from "@/services/reformulationService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useReformulate(id: number) {
  const queryClient = useQueryClient();

  const { isPending, error, isError, mutate } = useMutation({
    mutationFn: (params: {
      translatedText: string;
      examples: string[];
      targetLang?: string;
    }) =>
      reformulationService.getReformulation(
        params.translatedText,
        params.examples,
        params.targetLang
      ),
    onSuccess: (data) =>
      queryClient.setQueryData(["reformulation", id], data.trim()),
  });

  const reformulation = queryClient.getQueryData<string>(["reformulation", id]);

  return {
    reformulation,
    error,
    isLoading: isPending,
    isError,
    mutate,
  };
}
