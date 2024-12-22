import { getMatches } from "@/services/translationMemoryService";
import { DocumentSegment } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useMatches(segments: DocumentSegment[]) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["matches", segments],
    queryFn: () => fetchMatches(segments),
  });

  async function fetchMatches(segments: DocumentSegment[]) {
    const currentSegments = segments.slice(0, 10);
    const results = await getMatches({
      searchTerms: currentSegments.map((segment) => segment.source),
    });
    console.log(results);

    const matches = results.map((result, idx) => ({
      ...result,
      id: currentSegments[idx].id,
    }));

    return matches;
  }

  return { isPending, isError, data, error };
}
