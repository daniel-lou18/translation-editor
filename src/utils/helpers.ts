import { ProjectCardProps } from "@/components/Dashboard/ProjectCard";
import { NormalizedTranslations, ProjectWithDocsAndTrans } from "@/types";
import { Segment } from "@/types/Segment";

export function calculateProgress(
  segments: Segment[],
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

export function formatTranslationsToTableRows(
  translations: NormalizedTranslations | null
) {
  if (!translations) return [];

  return Object.values(translations || {}).map((translation) => ({
    ...translation,
    id: translation.id.toString(),
    progress: Math.round(
      (translation.targetSegments.filter((seg) => seg.status === "translated")
        .length /
        translation.targetSegments.length) *
        100
    ),
  }));
}

export function formatProjectsToCards(
  projects: ProjectWithDocsAndTrans[] | undefined
) {
  if (!projects) return null;

  return projects.map((project) => ({
    ...project,
    info: {
      description: project.description,
      documentsCount: project.documents.length,
      translationsCount: project.documents.reduce(
        (acc, doc) => acc + doc.translations.length,
        0
      ),
    },
  }));
}
