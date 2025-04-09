import { reformulationService } from "@/services/reformulationService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEditor } from "@/contexts/editorContext";
export function useReformulate() {
  const { activeSegmentId } = useEditor();
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
      queryClient.setQueryData(["reformulation", activeSegmentId], data.trim()),
  });

  const reformulation = queryClient.getQueryData<string>([
    "reformulation",
    activeSegmentId,
  ]);

  return {
    reformulation,
    error,
    isLoading: isPending,
    isError,
    mutate,
  };
}
