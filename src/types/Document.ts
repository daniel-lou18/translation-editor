import { Translation, TranslationWithDocument } from "./Translation";
import { Domain, LangCode } from ".";

export type Document = {
  id: number;
  projectId: number;
  fileName: string;
  sourceLang: LangCode;
  domain: Domain | null;
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

export type DocumentWithTranslationsWithDoc = Document & {
  translations: TranslationWithDocument[];
};

export type NormalizedDocsWithTrans = Record<
  string,
  DocumentWithTranslationsWithDoc
>;
