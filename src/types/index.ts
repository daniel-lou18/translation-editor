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

export type DocumentSegment = {
  id: number;
  source: string;
  target: string;
  completed: boolean;
};

export type TranslationMemoryMatches = Record<number, TranslationMatch>;

export type Translations = Record<number, string>;

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

export type ProjectWithTranslations = Project & { translations: Translation[] };
