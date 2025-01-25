import { translationMemoryService } from "@/services/translationMemoryService";
import { Segment } from "@/types/Segment";
import { useQuery } from "@tanstack/react-query";

export function useSemanticMatches(segment: Segment) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["semantic-matches", segment.id],
    queryFn: () => translationMemoryService.getMatches(segment.sourceSegmentId),
    enabled: !!segment,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { isPending, isError, matches: data || null, error };
}
