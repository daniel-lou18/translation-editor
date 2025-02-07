import {
  Document,
  DocumentWithTranslations,
  DocumentWithTranslationsWithDoc,
} from "./Document";

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

export type DashboardProject = {
  id: string;
  info: {
    description: string | null;
    documentsCount: number;
    translationsCount: number;
  };
  name: string;
  description: string | null;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  documents: DocumentWithTranslations[];
};

export type ProjectWithDocsAndTransWithDoc = Project & {
  documents: DocumentWithTranslationsWithDoc[];
};

export type OptionalProjectWithId = Partial<Project> & { id: number };
