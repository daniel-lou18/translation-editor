import { Document, DocumentWithTranslations } from "./Document";

export type ProjectStatus = "active" | "archived";

export type Project = {
  id: number;
  name: string;
  description: string | null;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
};

export type ProjectWithDocuments = Project & { documents: Document[] };
export type ProjectWithDocsAndTrans = Project & {
  documents: DocumentWithTranslations[];
};
