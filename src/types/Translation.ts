import { Document } from "./Document";
import { Segment } from "./Segment";

export type SegmentStatus = "translated" | "untranslated";

export type Translation = {
  id: number;
  documentId: number;
  targetLang: string;
  status: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TargetSegment = {
  id: number;
  translationId: number;
  sourceSegmentId: number;
  targetText: string | null;
  embedding: number[] | null;
  status: SegmentStatus | null;
  createdAt: string;
  updatedAt: string;
};

export type TranslationWithTargetSegments = Translation & {
  targetSegments: TargetSegment[];
};

export type TranslationWithSegments = {
  translation: Translation;
  document: Document;
  segments: Segment[];
};
