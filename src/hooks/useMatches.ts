import { getMatches } from "@/services/translationMemoryService";
import { DocumentSegment, TranslationMemoryMatches } from "@/types";
import { calculateProgress } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useMatches(segments: DocumentSegment[]) {
  const batchSize = 10;
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [matches, setMatches] = useState<TranslationMemoryMatches>({});

  const progress = calculateProgress(segments, currentBatchIndex, batchSize);

  const { isPending, isError, error } = useQuery({
    queryKey: ["matches", currentBatchIndex, segments.length],
    queryFn: fetchNextBatch,
    enabled: currentBatchIndex * batchSize < segments.length,
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

    setMatches((prevMatches) => ({
      ...prevMatches,
      ...currentMatches,
    }));

    if (endIndex < segments.length) {
      setCurrentBatchIndex((prevIdx) => prevIdx + 1);
    }

    return currentMatches;
  }

  return { isPending, isError, data: matches, error, progress };
}
