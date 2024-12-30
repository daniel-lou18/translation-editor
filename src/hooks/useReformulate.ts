import { getReformulation } from "@/services/reformulationService";
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
  });

  async function fetchReformulation(
    id: number,
    translatedText: string,
    examples: string[]
  ) {
    try {
      const cachedReformulation = queryClient.getQueryData<Translations>([
        "reformulation",
        id,
      ]);
      if (cachedReformulation?.[id]) {
        return cachedReformulation;
      }

      if (!translatedText) {
        throw new Error("Translated text to reformulate is missing");
      }

      const result = await getReformulation(translatedText, examples);
      console.log(result);

      return { [id]: result.trim() };
    } catch (error) {
      console.error("Failed to fetch translation", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Unknown error while fetching translation"
      );
    }
  }

  return { data, error, isPending, isError, mutate };
}
