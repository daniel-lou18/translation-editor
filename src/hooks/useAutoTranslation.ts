import { translationService } from "@/services/translationService";
import {
  LangCode,
  SegmentWithTranslation,
  SemanticMatch,
  Translations,
} from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useAutoTranslation(
  segment: SegmentWithTranslation,
  matches: SemanticMatch[] | null
) {
  const queryClient = useQueryClient();

  const {
    id,
    sourceText,
    translation: { sourceLang, targetLang },
  } = segment;

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["auto-translation", id],
    queryFn: () => fetchTranslation(id, sourceText, matches),
    enabled: !!segment,
    staleTime: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  });

  async function fetchTranslation(
    id: number,
    sourceText: string | null,
    matches: SemanticMatch[] | null
  ) {
    const cachedTranslation = queryClient.getQueryData<Translations>([
      "auto-translation",
      id,
    ]);

    if (cachedTranslation?.[id]) {
      return cachedTranslation;
    }
    if (!sourceText) {
      throw new Error("Source text and/or matches are missing");
    }

    const result = await translationService.getTranslation(
      sourceText,
      matches || [],
      sourceLang as LangCode,
      targetLang as LangCode
    );

    return { [id]: result.trim() };
  }

  return { data, error, isPending, isError };
}
