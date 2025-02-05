import { FormEvent, useState } from "react";
import { useFileManager } from "@/hooks/useFileManager";
import { useSubmitFiles } from "@/hooks/useSubmitFiles";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import { Lang } from "@/types";

export function useUpload(newProject = true) {
  const { files, processFiles, removeFile } = useFileManager();
  const { mutate, isLoading } = useSubmitFiles();
  const { navigateToTranslation, projectId } = useTranslationRoute();
  const [sourceLang, setSourceLang] = useState<Lang>("English (USA)");
  const [targetLang, setTargetLang] = useState<Lang>("French (France)");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(
      {
        files,
        fileMetadata: { sourceLang, targetLang, projectId },
        newProject,
      },
      {
        onSuccess: (params) => navigateToTranslation(params),
        onError: (error) => console.log(error),
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
    handleSubmit,
  };
}
