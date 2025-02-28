import { FormEvent, useState, useCallback } from "react";
import { useFileManager } from "@/hooks/useFileManager";
import { SubmitDocumentResult } from "@/hooks/useSubmitFiles";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import { Lang, Domain } from "@/types";
import { toast } from "sonner";
import { useSubmitDocument } from "./useSubmitDocument";

export function useDocumentUpload(newProject = true) {
  const { files, processFiles, removeFile } = useFileManager();
  const { mutate, isLoading } = useSubmitDocument();
  const { navigateToTranslation, projectId } = useTranslationRoute();
  const [sourceLang, setSourceLang] = useState<Lang>("English (USA)");
  const [targetLang, setTargetLang] = useState<Lang>("French (France)");
  const [domain, setDomain] = useState<Domain>("legal");

  const handleSuccess = useCallback((params: SubmitDocumentResult) => {
    return navigateToTranslation(params);
  }, [navigateToTranslation]);

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
        file: files[0].file,
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
  };
}
