import {
  NormalizedProjectsWithTranslations,
  NormalizedTranslations,
  ProjectWithTranslations,
  Translation,
} from "@/types";
import { useProjects } from "./useProjects";
import { useMemo } from "react";

export function useCurrentProject(
  projectId: string | undefined,
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

  const currentProject = useMemo<ProjectWithTranslations | null>(
    () =>
      normalizedProjects && projectId ? normalizedProjects[projectId] : null,
    [normalizedProjects, projectId]
  );

  const currentTranslations = useMemo<NormalizedTranslations | null>(
    () =>
      currentProject &&
      Object.fromEntries(
        currentProject.translations.map((translation) => [
          translation.id,
          translation,
        ])
      ),
    [currentProject]
  );
  const currentTranslation = useMemo<Translation | null>(
    () =>
      currentTranslations && translationId
        ? currentTranslations[translationId]
        : null,
    [currentTranslations, translationId]
  );

  return {
    projects: normalizedProjects,
    currentTranslations,
    currentProject,
    currentTranslation,
    ...rest,
  };
}
