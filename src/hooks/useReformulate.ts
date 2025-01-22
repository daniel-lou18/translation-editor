import { reformulationService } from "@/services/reformulationService";
import { TranslationRecords } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
      queryClient.setQueryData<TranslationRecords>(
        ["reformulation"],
        (prevData = {}) => ({
          ...prevData,
          [id]: data.trim(),
        })
      ),
  });
  const { data } = useQuery<TranslationRecords>({
    queryKey: ["reformulation"],
  });

  return {
    reformulation: data?.[id],
    error,
    isLoading: isPending,
    isError,
    mutate,
  };
}
