import { Translation } from "./Translation";

export type Document = {
  id: number;
  projectId: number;
  fileName: string;
  sourceLang: string;
  domain: string | null;
  subdomain: string | null;
  docType: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SourceSegment = {
  id: number;
  documentId: number;
  sourceText: string;
  segmentOrder: number;
  embedding: number[] | null;
};

export type DocumentWithSourceSegments = Document & {
  sourceSegments: SourceSegment[];
};

export type DocumentWithTranslations = Document & {
  translations: Translation[];
};

export type NormalizedDocsWithTrans = Record<string, DocumentWithTranslations>;
