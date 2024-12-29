import { getMatches } from "@/services/translationMemoryService";
import { DocumentSegment, TranslationMemoryMatches } from "@/types";
import { calculateProgress } from "@/utils/helpers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useMatches(segments: DocumentSegment[]) {
  const queryClient = useQueryClient();
  const batchSize = 10;
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [allBatchesProcessed, setAllBatchesProcessed] = useState(false);

  const progress = calculateProgress(segments, currentBatchIndex, batchSize);

  const { isPending, isError, error } = useQuery({
    queryKey: ["matches", currentBatchIndex, segments.length],
    queryFn: fetchNextBatch,
    enabled:
      !allBatchesProcessed && currentBatchIndex * batchSize < segments.length,
  });

  async function fetchNextBatch() {
    const startIndex = currentBatchIndex * batchSize;
    const endIndex = Math.min(startIndex + batchSize, segments.length);
    const currentSegments = segments.slice(startIndex, endIndex);

    const results = await getMatches({
      searchTerms: currentSegments.map((segment) => segment.source),
    });

    const currentMatches = Object.fromEntries(
      currentSegments.map((segment, idx) => [segment.id, results[idx]])
    );

    queryClient.setQueryData(
      ["matches"],
      (prevMatches: TranslationMemoryMatches) => ({
        ...prevMatches,
        ...currentMatches,
      })
    );

    if (endIndex < segments.length) {
      setCurrentBatchIndex((prevIdx) => prevIdx + 1);
    } else {
      setAllBatchesProcessed(true);
      setCurrentBatchIndex(0);
    }

    return currentMatches;
  }

  const allMatches =
    queryClient.getQueryData<TranslationMemoryMatches>(["matches"]) || {};

  return { isPending, isError, data: allMatches, error, progress };
}
