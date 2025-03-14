import { LangCode } from ".";
import { Document, DocumentWithSourceSegments } from "./Document";
import { Segment } from "./Segment";

export type SegmentStatus = "translated" | "untranslated";

export type SelectTranslation = {
  id: number;
  documentId: number;
  targetLang: string;
  status: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Translation = {
  id: number;
  documentId: number;
  targetLang: LangCode;
  status: string | null;
  createdAt: string;
  updatedAt: string;
  targetSegments: TargetSegment[];
};

export type FormattedTranslation = {
  id: number;
  documentId: number;
  fileName: string;
  progress: number;
  targetLang: LangCode;
  status: string | null;
  createdAt: string;
  updatedAt: string;
  targetSegments: TargetSegment[];
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

export type TranslationWithTargetSegments = TranslationWithDocument & {
  targetSegments: TargetSegment[];
};

export type TranslationWithSegments = {
  translation: Translation;
  document: DocumentWithSourceSegments;
  segments: Segment[];
};

export type TranslationWithDocument = Translation & { document: Document };
