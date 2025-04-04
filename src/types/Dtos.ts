import { Lang, Domain } from ".";
import {
  Document,
  SourceSegment,
  DocumentWithSourceSegments,
} from "./Document";
import { Tm } from "./Tm";
import { TargetSegment, Translation } from "./Translation";

export type JoinedSegment = {
  sourceSegment: SourceSegment;
  targetSegment: TargetSegment;
};

export type TranslationWithJoinedSegments = {
  translation: Translation;
  document: DocumentWithSourceSegments;
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

export type FileMetadata = {
  sourceLang: Lang;
  targetLang: Lang;
  domain: Domain;
  projectId?: string;
  tmId?: string;
};

export type Languages = {
  sourceLang: Lang;
  targetLang: Lang;
};

export type DocumentPairId = {
  tmId: number;
};

export type AddTmPairsDTO = {
  tmId: string;
  sourceLang: Lang;
  targetLang: Lang;
  domain: Domain;
};

export type TextSegment = { sourceText: string; targetText: string };

export type UpdateTmDto = Partial<Tm> & { id: number };

export type UpdateDocDto = Partial<Document> & { id: number };
