import {
  DocumentWithTranslations,
  NormalizedDocsWithTrans,
  NormalizedProjectsWithTranslations,
  NormalizedTranslations,
  ProjectWithDocsAndTrans,
} from "@/types";
import { Translation as TranslationDto } from "@/types/Translation";
import { useProjects } from "./useProjects";
import { useMemo } from "react";

export function useCurrentProject(
  projectId: string | undefined,
  documentId: string | undefined,
  translationId: string | undefined
) {
  const { data: projects, ...rest } = useProjects();

  const normalizedProjects =
    useMemo<NormalizedProjectsWithTranslations | null>(() => {
      if (!projects?.length) return null;
      return Object.fromEntries(
        projects.map((project) => [project.id, project])
      );
    }, [projects]);

  const currentProject = useMemo<ProjectWithDocsAndTrans | null>(
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

  const currentDocument = useMemo<DocumentWithTranslations | null>(
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

  const currentTranslation = useMemo<TranslationDto | null>(
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
