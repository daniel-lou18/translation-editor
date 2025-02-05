import { Lang } from ".";
import { Document, SourceSegment } from "./Document";
import { TargetSegment, Translation } from "./Translation";

export type JoinedSegment = {
  sourceSegment: SourceSegment;
  targetSegment: TargetSegment;
};

export type TranslationWithJoinedSegments = {
  translation: Translation;
  document: Document;
  segments: JoinedSegment[];
};

export type Update = {
  sourceSegmentId: number;
  targetText: string | null;
  status: string | null;
};

export type UpdateSegmentsDTO = {
  translationId: string;
  updates: Update[];
};

export type TmSegmentMatch = {
  sourceSegment: {
    id: number;
    textContent: string;
    similarityScore: number;
  };
  targetSegment: {
    id: number;
    textContent: string;
  } | null; // Null if no target segment exists
};

export type LangMetadata = {
  sourceLang?: Lang;
  targetLang: Lang;
};
