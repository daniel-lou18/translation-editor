import { domains, languageToCodeMap } from "@/utils/constants";
import { ProjectWithDocsAndTransWithDoc } from "./Project";
import { TranslationWithDocument } from "./Translation";

export * from "./Project";
export * from "./Document";
export * from "./Translation";
export * from "./Segment";
export * from "./TranslationPair";

export type SearchQuery = { searchTerms: string[] };

export type Match = {
  sourceText: string;
  targetText: string;
  similarityScore: number;
};

export type TranslationMatch = {
  queryText: string;
  matches: Match[];
};

export type SemanticMatch = {
  id: number;
  sourceText: string;
  targetText: string;
  similarityScore: number;
  sourceLang?: string;
  targetLang?: string;
  domain?: string | null;
  subdomain?: string | null;
  docType?: string | null;
};

export type DocumentSegment = {
  id: number;
  source: string;
  target: string;
  completed: boolean;
};

export type TranslationMemoryMatches = Record<number, TranslationMatch>;

export type TranslationRecords = Record<number, string>;

export type ApiResponseType<T> = {
  data: T;
  status: "success" | "fail";
};

export type ApiResponse<T> = {
  data: ApiResponseType<T>;
  status: number;
  message?: string;
};

export type Project = {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  lastModified: string;
};

export type Translation = {
  id: number;
  projectId: number;
  name: string;
  fileName: string;
  sourceLang: string;
  targetLang: string;
  domain: string | null;
  subdomain: string | null;
  docType: string | null;
  status: string | null;
  createdAt: string;
  lastModified: string;
};
export type NormalizedTranslations = Record<string, TranslationWithDocument>;

export type NormalizedProjectsWithTranslations = Record<
  string,
  ProjectWithDocsAndTransWithDoc
>;

export type Segment = {
  id: number;
  translationId: number;
  sourceText: string;
  targetText: string;
  status: string;
  embedding: number[] | null;
};

export type SegmentWithTranslation = Segment & { translation: Translation };

export type UpdatedId = { updatedId: number };

export type ContentType =
  (typeof outputContentTypes)[keyof typeof outputContentTypes];

export type FileType = keyof typeof outputContentTypes;

export const outputContentTypes = {
  txt: "text/plain",
  csv: "text/csv",
  json: "application/json",
} as const;

export type BlobResponse = { data: Blob; fileName: string };

export type LangCode = LangCodeMap[keyof LangCodeMap];

export type Lang = keyof LangCodeMap;

export type LangCodeMap = typeof languageToCodeMap;

export type Domain = (typeof domains)[number];

export type LangDomain = { lang: Lang; domain: Domain };

export type FullLangsDomain = {
  sourceLang: Lang;
  targetLang: Lang;
  domain: Domain;
};

export type LangCodesDomain = {
  sourceLang: LangCode;
  targetLang: LangCode;
  domain: Domain;
};
