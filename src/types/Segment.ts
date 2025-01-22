export type ImmutableSegmentContext = {
  id: number;
  translationId: number;
  sourceSegmentId: number;
  sourceText: string;
  sourceLang: string;
  targetLang: string;
  embedding: number[] | null;
};

export type MutableSegmentData = {
  targetText: string | null;
  status: string | null;
};

export type Segment = ImmutableSegmentContext & MutableSegmentData;
