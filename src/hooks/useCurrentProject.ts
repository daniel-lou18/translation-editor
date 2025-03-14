import {
  DocumentWithTranslationsWithDoc,
  NormalizedDocsWithTrans,
  NormalizedProjectsWithTranslations,
  NormalizedTranslations,
  ProjectWithDocsAndTransWithDoc,
} from "@/types";
import { TranslationWithDocument } from "@/types/Translation";
import { useProjects } from "./useProjects";
import { useMemo } from "react";
import { useRoute } from "./useRoute";

export function useCurrentProject() {
  const { projectId, documentId, translationId } = useRoute();
  const { data: projects, ...rest } = useProjects();

  const normalizedProjects =
    useMemo<NormalizedProjectsWithTranslations | null>(() => {
      if (!projects?.length) return null;
      return Object.fromEntries(
        projects.map((project) => [project.id, project])
      );
    }, [projects]);

  const currentProject = useMemo<ProjectWithDocsAndTransWithDoc | null>(
    () =>
      normalizedProjects && projectId ? normalizedProjects[projectId] : null,
    [normalizedProjects, projectId]
  );

  const currentDocuments = useMemo<NormalizedDocsWithTrans | null>(
    () =>
      currentProject &&
      Object.fromEntries(currentProject.documents.map((doc) => [doc.id, doc])),
    [currentProject]
  );

  const currentDocument = useMemo<DocumentWithTranslationsWithDoc | null>(
    () =>
      currentDocuments && documentId ? currentDocuments[documentId] : null,
    [currentDocuments, documentId]
  );

  const currentTranslations = useMemo<NormalizedTranslations | null>(
    () =>
      currentDocument &&
      Object.fromEntries(
        currentDocument.translations.map((translation) => [
          translation.id,
          translation,
        ])
      ),
    [currentDocument]
  );

  const currentTranslation = useMemo<TranslationWithDocument | null>(
    () =>
      currentTranslations && translationId
        ? currentTranslations[translationId]
        : null,
    [currentTranslations, translationId]
  );

  return {
    projects: normalizedProjects,
    currentDocuments,
    currentDocument,
    currentTranslations,
    currentProject,
    currentTranslation,
    ...rest,
  };
}
