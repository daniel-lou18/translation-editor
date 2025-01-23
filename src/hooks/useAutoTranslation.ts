import { translateService } from "@/services/translateService";
import { LangCode, SemanticMatch } from "@/types";
import { Segment } from "@/types/Segment";
import { useQuery } from "@tanstack/react-query";

export function useAutoTranslation(
  segment: Segment,
  matches: SemanticMatch[] | null
) {
  const { id, sourceText, sourceLang, targetLang } = segment;

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["auto-translation", id],
    queryFn: () => fetchTranslation(sourceText, matches),
    enabled: !!sourceText && !!matches && !(segment.status === "translated"),
    staleTime: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  });

  async function fetchTranslation(
    sourceText: string | null,
    matches: SemanticMatch[] | null
  ): Promise<string> {
    if (!sourceText) {
      throw new Error("Source text and/or matches are missing");
    }

    const result = await translateService.getTranslation(
      sourceText,
      matches || [],
      sourceLang as LangCode,
      targetLang as LangCode
    );

    return result.trim();
  }

  return { autoTranslation: data, error, isPending, isError };
}
