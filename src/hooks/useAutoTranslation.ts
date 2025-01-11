import { translationService } from "@/services/translationService";
import { Segment, SemanticMatch, Translations } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useAutoTranslation(
  segment: Segment,
  matches: SemanticMatch[] | null
) {
  const queryClient = useQueryClient();

  const { id, sourceText } = segment;

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["auto-translation", id],
    queryFn: () => fetchTranslation(id, sourceText, matches),
    enabled: !!segment && !!matches?.length,
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

    if (!sourceText || !matches?.length) {
      throw new Error("Source text and/or matches are missing");
    }

    const result = await translationService.getTranslation(sourceText, matches);

    return { [id]: result.trim() };
  }

  return { data, error, isPending, isError };
}
