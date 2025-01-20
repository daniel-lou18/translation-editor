export type TranslationPair = {
  id: number;
  sourceText: string;
  targetText: string;
  sourceLang: string;
  targetLang: string;
  domain: string | null;
  subdomain: string | null;
  docType: string | null;
  createdAt: string;
  updatedAt: string;
  embedding: number[] | null;
};
