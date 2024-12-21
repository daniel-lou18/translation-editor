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
