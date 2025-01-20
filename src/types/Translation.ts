import { Document } from "./Document";
import { JoinedSegment, Segment } from "./Segment";

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
  status: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TranslationWithTargetSegments = Translation & {
  targetSegments: TargetSegment[];
};

export type TranslationWithJoinedSegments = {
  translation: Translation;
  document: Document;
  segments: JoinedSegment[];
};

export type TranslationWithSegments = {
  translation: Translation;
  document: Document;
  segments: Segment[];
};
