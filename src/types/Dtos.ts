export type Update = {
  sourceSegmentId: number;
  targetText: string | null;
  status: string | null;
};

export type UpdateSegmentsDTO = {
  translationId: string;
  updates: Update[];
};
