import { getTranslation } from "@/services/translationService";
import {
  DocumentSegment,
  TranslationMatch,
  TranslationMemoryMatches,
  Translations,
} from "@/types";
import { createTranslationPrompt } from "@/utils/prompts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export function useAutoTranslation(
  segment: DocumentSegment,
  matches: TranslationMemoryMatches
) {
  const queryClient = useQueryClient();

  const { id, source } = segment;
  const currentMatches = useMemo(() => matches[id], [matches, id]);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["auto-translation", id],
    queryFn: () => fetchTranslation(id, source, currentMatches),
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
