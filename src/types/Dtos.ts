import { Lang, Domain } from ".";
import {
  Document,
  SourceSegment,
  DocumentWithSourceSegments,
} from "./Document";
import { Tm } from "./Tm";
import {
  SegmentStatus,
  TargetSegment,
  Translation,
  TranslationStatus,
} from "./Translation";

export type JoinedSegment = {
  sourceSegment: SourceSegment;
  targetSegment: TargetSegment;
};

export type TranslationWithJoinedSegments = {
  translation: Translation;
  document: DocumentWithSourceSegments;
  segments: JoinedSegment[];
};

export type SegmentUpdate = {
  sourceSegmentId: number;
  targetText: string | null;
  status: SegmentStatus | null;
};

export type SegmentUpdateDTO = {
  translationId: number;
  update: SegmentUpdate;
};

export type UpdateSegmentsDTO = {
  translationId: number;
  updates: SegmentUpdate[];
};

export type TranslationUpdate = {
  translationId: string;
  status: TranslationStatus;
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

export type UpdateTranslationDto = Partial<Translation> & { id: number };
