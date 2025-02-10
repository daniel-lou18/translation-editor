import {
  Lang,
  NormalizedTranslations,
  ProjectWithDocsAndTrans,
  ProjectWithDocsAndTransWithDoc,
  TranslationWithTargetSegments,
} from "@/types";
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
    id: String(translation.id),
    documentId: String(translation.documentId),
    fileName: translation.document.fileName,
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
    id: project.id.toString(),
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

export function getAllTranslationsFromProject(
  project: ProjectWithDocsAndTransWithDoc | null
) {
  if (!project) return [];

  const translations = project.documents.reduce<
    TranslationWithTargetSegments[]
  >((acc, doc) => [...acc, ...doc.translations], []);

  return translations.map((translation) => ({
    ...translation,
    id: translation.id,
    documentId: translation.documentId,
    fileName: translation.document.fileName,
    progress: Math.round(
      (translation.targetSegments.filter((seg) => seg.status === "translated")
        .length /
        translation.targetSegments.length) *
        100
    ),
  }));
}

export function langArrayToComboItems(languages: Lang[]) {
  return languages.map((lang) => ({
    value: lang,
    label: lang,
  }));
}
