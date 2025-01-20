import { reformulationService } from "@/services/reformulationService";
import { Translations } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useReformulate(
  id: number,
  translatedText: string,
  examples: string[]
) {
  const queryClient = useQueryClient();

  const { data, error, isPending, isError, mutate } = useMutation({
    mutationFn: () => fetchReformulation(id, translatedText, examples),
    onSuccess: (data) =>
      queryClient.setQueryData<Translations>(["reformulation"], (prevData) => ({
        ...prevData,
        ...data,
      })),
  });

  async function fetchReformulation(
    id: number,
    translatedText: string,
    examples: string[]
  ) {
    const cachedReformulations = queryClient.getQueryData<Translations>([
      "reformulation",
    ]);

    if (cachedReformulations?.[id]) {
      return { [id]: cachedReformulations?.[id] };
    }

    if (!translatedText) {
      throw new Error("Translated text to reformulate is missing");
    }

    const result = await reformulationService.getReformulation(
      translatedText,
      examples
    );
    const record = { [id]: result.trim() };

    return record;
  }

  return { data, error, isPending, isError, mutate };
}
