import { Document, DocumentWithTranslations } from "./Document";

export type Project = {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ProjectWithDocuments = Project & { documents: Document[] };
export type ProjectWithDocsAndTrans = Project & {
  documents: DocumentWithTranslations[];
};
