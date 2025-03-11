import { LangCode } from ".";

export type ImmutableSegmentContext = {
  id: number;
  translationId: number;
  sourceSegmentId: number;
  sourceText: string;
  sourceLang: LangCode;
  targetLang: LangCode;
  embedding: number[] | null;
};

export type MutableSegmentData = {
  targetText: string | null;
  status: string | null;
};

export type Segment = ImmutableSegmentContext & MutableSegmentData;

export type SegmentType = {
  id: number;
  sourceText: string;
  targetText: string | null;
  status: string | null;
};

export type EditorSegmentType = SegmentType & {
  activeId: number;
  index: number;
  placeholder?: string | null;
};
