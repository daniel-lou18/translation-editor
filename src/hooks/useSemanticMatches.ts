import { tmService } from "@/services/tmService";
import { Segment } from "@/types/Segment";
import { useQuery } from "@tanstack/react-query";

export function useSemanticMatches(segment: Segment | null) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["semantic-matches", segment?.id],
    queryFn: () => handleMatches(segment?.sourceSegmentId),
    enabled: !!segment,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  async function handleMatches(sourceSegmentId: number | undefined) {
    if (!sourceSegmentId) throw new Error("Source segment ID is required");
    const matches = await tmService.getMatches(sourceSegmentId);
    return matches;
  }

  return { isPending, isError, matches: data || null, error };
}
