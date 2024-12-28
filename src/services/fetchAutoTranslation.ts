import { getTranslation } from "@/services/translationService";
import { DocumentSegment, TranslationMatch, Translations } from "@/types";
import { createTranslationPrompt } from "@/utils/prompts";
import { QueryClient, useQuery } from "@tanstack/react-query";

export async function fetchAutoTranslation(
  queryClient: QueryClient,
  segment: DocumentSegment,
  matches: TranslationMatch
) {
  const { id, source } = segment;

  const { data, error, isPending, isError } = queryClient.fetchQuery({
    queryKey: ["auto-translation", id],
    queryFn: () => fetchTranslation(id, source, matches),
    staleTime: 30 * 60 * 1000, // 30 minutes in milliseconds
  });

  async function fetchTranslation(
    id: number,
    sourceText: string | null,
    matches: TranslationMatch
  ) {
    try {
      const cachedTranslation = queryClient.getQueryData<Translations>([
        "auto-translation",
        id,
      ]);
      if (cachedTranslation?.[id]) {
        return cachedTranslation;
      }

      const translationPrompt = createTranslationPrompt(sourceText, matches);
      const result = await getTranslation(translationPrompt);

      const parsedResult = result
        .trim()
        .replace("French", "")
        .trim()
        .replace("(Target):", "")
        .trim();

      return { [id]: parsedResult };
    } catch (error) {
      console.error("Failed to fetch translation", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Unknown error while fetching translation"
      );
    }
  }

  return { data, error, isPending, isError };
}
