import { Tm } from "./Tm";

export type GlossaryTerm = {
  id: number;
  createdAt: string;
  updatedAt: string;
  tmId: number;
  sourceTerm: string;
  targetTerm: string;
  type: string | null;
  context: string | null;
};

export type GlossaryTermWithDocPair = {
  glossaryTerm: GlossaryTerm;
  tm: Tm | null;
};
