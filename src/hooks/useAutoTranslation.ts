import { getTranslation } from "@/services/translationService";
import {
  DocumentSegment,
  TranslationMemoryMatches,
  Translations,
} from "@/types";
import { createTranslationPrompt } from "@/utils/prompts";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useAutoTranslation(
  id: number,
  segments: DocumentSegment[],
  matches: TranslationMemoryMatches
) {
  const queryClient = useQueryClient();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["auto-translation", id],
    queryFn: () => fetchTranslation(id),
  });

  async function fetchTranslation(id: number) {
    const cachedTranslation = queryClient.getQueryData<Translations>([
      "auto-translation",
      id,
    ]);
    if (cachedTranslation?.[id]) {
      return cachedTranslation;
    }

    const currentSourceText =
      segments.find((segment) => segment.id === id)?.source || null;
    const currentMatches = matches[id];
    const translationPrompt = createTranslationPrompt(
      currentSourceText,
      currentMatches
    );

    const result = await getTranslation(translationPrompt);
    const parsedResult = result
      .trim()
      .replace("French", "")
      .trim()
      .replace("(Target):", "")
      .trim();
    const translation = { [id]: parsedResult };

    return translation;
  }

  return { data, error, isPending, isError };
}
