import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";

export type NavigationParams = {
  projectId: string | number | undefined;
  documentId: string | number | undefined;
  translationId: string | number | undefined;
};

export function useRoute() {
  const { projectId, documentId, translationId } = useParams();
  const navigate = useNavigate();

  const navigateToProjects = useCallback(() => {
    navigate("/app/dashboard/projects");
  }, [navigate]);

  const navigateToProject = useCallback(
    (projectId: number | string | undefined) => {
      if (!projectId) {
        throw new Error("Project id is missing");
      }

      navigate(
        `/app/projects/${projectId}
        }`
      );
    },
    [navigate]
  );

  const navigateToDocument = useCallback(
    (documentId: number | string | undefined) => {
      if (!projectId) {
        throw new Error("Project id is missing");
      }

      navigate(
        `/app/projects/${projectId}/documents/${documentId}/translations`
      );
    },
    [navigate]
  );

  const navigateToDocumentDetails = useCallback(
    (documentId: number) => {
      if (!projectId) {
        throw new Error("Project id is missing");
      }

      navigate(`/app/projects/${projectId}/documents/${documentId}`);
    },
    [navigate]
  );

  const navigateToTranslations = useCallback(
    (documentId: number) => {
      if (!documentId) {
        throw new Error("Id(s) is/are missing");
      }

      navigate(
        `/app/projects/${projectId}/documents/${documentId}/translations`
      );
    },
    [navigate]
  );

  const navigateToTranslation = useCallback(
    ({ projectId, documentId, translationId }: NavigationParams) => {
      if (!projectId || !documentId || !translationId) {
        throw new Error("Id(s) is/are missing");
      }

      navigate(
        `/app/projects/${projectId}/documents/${documentId}/translations/${translationId}`
      );
    },
    [navigate]
  );

  const navigateToTranslationDetails = useCallback(
    ({ documentId, translationId }: Omit<NavigationParams, "projectId">) => {
      if (!projectId) {
        throw new Error("Project id is missing");
      }

      navigate(
        `/app/projects/${projectId}/documents/${documentId}/translations/${translationId}/details`
      );
    },
    [navigate]
  );

  const navigateToTms = useCallback(() => {
    if (!projectId) {
      throw new Error("Project id is missing");
    }

    navigate(`/app/projects/${projectId}/tms`);
  }, [navigate]);

  return {
    projectId,
    documentId,
    translationId,
    navigateToTranslations,
    navigateToTranslation,
    navigateToTranslationDetails,
    navigateToDocument,
    navigateToDocumentDetails,
    navigateToProject,
    navigateToProjects,
    navigateToTms,
  };
}
