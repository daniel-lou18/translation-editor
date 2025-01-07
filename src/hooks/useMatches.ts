import { translationMemoryService } from "@/services/translationMemoryService";
import { DocumentSegment, TranslationMemoryMatches } from "@/types";
import { calculateProgress } from "@/utils/helpers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useMatches(segments: DocumentSegment[]) {
  const queryClient = useQueryClient();
  const batchSize = 10;
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);

  const progress = calculateProgress(segments, currentBatchIndex, batchSize);

  const { isPending, isError, error } = useQuery({
    queryKey: ["matches", currentBatchIndex],
    queryFn: fetchNextBatch,
    enabled:
      currentBatchIndex * batchSize < segments.length && segments.length > 0,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  async function fetchNextBatch() {
    const startIndex = currentBatchIndex * batchSize;
    const endIndex = Math.min(startIndex + batchSize, segments.length);
    const currentSegments = segments.slice(startIndex, endIndex);

    const results = await translationMemoryService.getMatches({
      searchTerms: currentSegments.map((segment) => segment.source),
    });

    const currentMatches = Object.fromEntries(
      currentSegments.map((segment, idx) => [segment.id, results[idx]])
    );

    const prevMatches =
      currentBatchIndex > 0
        ? queryClient.getQueryData<TranslationMemoryMatches>([
            "matches",
            currentBatchIndex - 1,
          ])
        : {};

    if (endIndex < segments.length) {
      setCurrentBatchIndex((prevIdx) => prevIdx + 1);
    }

    return { ...prevMatches, ...currentMatches };
  }

  const allMatches =
    queryClient.getQueryData<TranslationMemoryMatches>([
      "matches",
      currentBatchIndex,
    ]) || {};

  // Set all the matches with a separate, easily accessible key that does not require a batch index to retrieve
  queryClient.setQueryDefaults(["allMatches"], {
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  queryClient.setQueryData<TranslationMemoryMatches>(
    ["allMatches"],
    allMatches
  );

  return { isPending, isError, data: allMatches, error, progress };
}
