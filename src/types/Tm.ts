export type TmDocumentPair = {
  id: number;
  sourceLang: string;
  targetLang: string;
  sourceFile: string | null;
  targetFile: string | null;
  domain: string | null;
  subdomain: string | null;
  docType: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UploadResult = {
  createdSegmentPairs: number;
  createdGlossaryTerms: number;
};

export type Tm = {
  id: number;
  name: string;
  description: string | null;
  sourceLang: string;
  targetLang: string;
  domain: string | null;
  subdomain: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TmFiles = {
  sourceFile: File;
  targetFile: File;
};
