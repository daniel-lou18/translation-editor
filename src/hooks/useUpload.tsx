import { FormEvent, useState } from "react";
import { useFileManager } from "@/hooks/useFileManager";
import { useSubmitFiles } from "@/hooks/useSubmitFiles";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import { Lang, Domain } from "@/types";
import { toast } from "sonner";

export function useUpload(newProject = true) {
  const { files, processFiles, removeFile } = useFileManager();
  const { mutate, isLoading } = useSubmitFiles();
  const { navigateToTranslation, projectId } = useTranslationRoute();
  const [sourceLang, setSourceLang] = useState<Lang>("English (USA)");
  const [targetLang, setTargetLang] = useState<Lang>("French (France)");
  const [domain, setDomain] = useState<Domain>("legal");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(
      {
        files,
        fileMetadata: { sourceLang, targetLang, domain, projectId },
        newProject,
      },
      {
        onSuccess: (params) => navigateToTranslation(params),
        onError: (error) =>
          toast.error(`Could not upload file: ${error}`, {
            classNames: {
              toast: "bg-red-200",
            },
          }),
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
