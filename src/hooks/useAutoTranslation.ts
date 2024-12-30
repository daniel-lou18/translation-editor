import { getTranslation } from "@/services/translationService";
import { DocumentSegment, TranslationMatch, Translations } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useAutoTranslation(
  segment: DocumentSegment,
  matches: TranslationMatch
) {
  const queryClient = useQueryClient();

  const { id, source } = segment;

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["auto-translation", id],
    queryFn: () => fetchTranslation(id, source, matches),
    enabled: !!segment && !!matches,
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

      if (!sourceText || matches.matches.length === 0) {
        throw new Error("Source text and/or matches are missing");
      }

      const result = await getTranslation(sourceText, matches);
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

  return { data, error, isPending, isError };
}
