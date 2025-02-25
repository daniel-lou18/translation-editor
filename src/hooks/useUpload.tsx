import { FormEvent, useState, useCallback } from "react";
import { useFileManager } from "@/hooks/useFileManager";
import { SubmitFileResult, useSubmitFiles } from "@/hooks/useSubmitFiles";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import { Lang, Domain } from "@/types";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
export function useUpload(newProject = true) {
  const queryClient = useQueryClient();
  const { files, processFiles, removeFile } = useFileManager();
  const { mutate, isLoading } = useSubmitFiles();
  const { navigateToTranslation, navigateToTms, projectId } = useTranslationRoute();
  const [sourceLang, setSourceLang] = useState<Lang>("English (USA)");
  const [targetLang, setTargetLang] = useState<Lang>("French (France)");
  const [domain, setDomain] = useState<Domain>("legal");

  const handleSuccess = useCallback((params: SubmitFileResult) => {
    if ("documentPairId" in params) {
      queryClient.invalidateQueries({ queryKey: ["tms"] });
      return navigateToTms();
    }

    return navigateToTranslation(params);
  }, [navigateToTms, navigateToTranslation, queryClient]);

  const handleError = useCallback((error: Error) => {
    toast.error(`Could not upload file: ${error}`, {
      classNames: {
        toast: "bg-red-200",
      },
    });
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(
      {
        files,
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
