import { FormEvent, useCallback } from "react";
import { SubmitDocumentResult } from "@/hooks/useSubmitFiles";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import { toast } from "sonner";
import { useSubmitDocument } from "./useSubmitDocument";
import { useUploadSingle } from "./useUploadSingle";

export function useDocumentUpload(newProject = true) {
  const {
    files,
    file,
    processFiles,
    removeFile,
    sourceLang,
    setSourceLang,
    targetLang,
    setTargetLang,
    domain,
    setDomain,
    domainItems,
    langItems,
  } = useUploadSingle();
  const { mutate, isLoading } = useSubmitDocument();
  const { navigateToTranslation, projectId } = useTranslationRoute();

  const handleSuccess = useCallback(
    (params: SubmitDocumentResult) => {
      return navigateToTranslation(params);
    },
    [navigateToTranslation]
  );

  const handleError = useCallback((error: Error) => {
    toast.error(`Could not upload document: ${error}`, {
      classNames: {
        toast: "bg-red-200",
      },
    });
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(
      {
        file,
        fileMetadata: { sourceLang, targetLang, domain, projectId },
        newProject,
      },
      {
        onSuccess: handleSuccess,
        onError: handleError,
      }
    );
  }

  return {
    files,
    processFiles,
    removeFile,
    isLoading,
    sourceLang,
    setSourceLang,
    targetLang,
    setTargetLang,
    domain,
    setDomain,
    handleSubmit,
    domainItems,
    langItems,
  };
}
