import { DocumentSegment } from "@/types";

export function calculateProgress(
  segments: DocumentSegment[],
  currentBatchIndex: number,
  batchSize: number
) {
  return {
    totalSegments: segments.length,
    processedSegments: Math.min(
      (currentBatchIndex + 1) * batchSize,
      segments.length
    ),
    percentage: Math.round(
      (Math.min((currentBatchIndex + 1) * batchSize, segments.length) /
        segments.length) *
        100
    ),
  };
}

export function convertToPercent(similarityScore: number) {
  return Math.round(similarityScore * 100);
}
