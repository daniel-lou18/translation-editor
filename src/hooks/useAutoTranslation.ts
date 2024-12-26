import { getTranslation } from "@/services/translationService";
import { DocumentSegment, TranslationMemoryMatches } from "@/types";
import { createTranslationPrompt } from "@/utils/prompts";
import { useQuery } from "@tanstack/react-query";

export function useAutoTranslation(
  id: number,
  segments: DocumentSegment[],
  matches: TranslationMemoryMatches
) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["auto-translation", id],
    queryFn: () => fetchTranslation(id),
  });

  async function fetchTranslation(id: number) {
    const currentSourceText =
      segments.find((segment) => segment.id === id)?.source || null;
    const currentMatches = matches[id];
    const translationPrompt = createTranslationPrompt(
      currentSourceText,
      currentMatches
    );

    const result = await getTranslation(translationPrompt);
    return result
      .trim()
      .replace("French", "")
      .trim()
      .replace("(Target):", "")
      .trim();
  }

  return { data, error, isPending, isError };
}
