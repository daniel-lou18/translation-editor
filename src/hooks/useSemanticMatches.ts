import { translationMemoryService } from "@/services/translationMemoryService";
import { Segment } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useSemanticMatches(segment: Segment) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["semantic-matches", segment.id],
    queryFn: fetchMatches,
    enabled: !!segment,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  async function fetchMatches() {
    return await translationMemoryService.getMatches({
      searchTerms: [segment.sourceText],
    });
  }

  return { isPending, isError, matches: data || null, error };
}
