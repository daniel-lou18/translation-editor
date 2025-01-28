export type GlossaryTerm = {
  id: number;
  createdAt: string;
  updatedAt: string;
  documentPairId: number;
  sourceTerm: string;
  targetTerm: string;
  type: string | null;
  context: string | null;
};
