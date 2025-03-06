import { FormEvent } from "react";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import { Lang, Domain } from "@/types";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useUploadDouble } from "./useUploadDouble";
import { useBaseMutation } from "./useBaseMutation";
import { DocumentPairId, FileMetadata } from "@/types/Dtos";
import { uploadService } from "@/services/uploadService";

export type CreateTmVariables = {
  files: File[];
  fileMetadata: FileMetadata;
};

export function useTmUpload() {
  const {
    sourceFile,
    targetFile,
    sourceLang,
    targetLang,
    domain,
    setSourceFile,
    setTargetFile,
    setSourceLang,
    setTargetLang,
    setDomain,
    domainItems,
    langItems,
  } = useUploadDouble();
  const queryClient = useQueryClient();

  const { mutate, isPending: isLoading } = useBaseMutation({
    mutationFn: async (
      variables: CreateTmVariables
    ): Promise<DocumentPairId> => {
      const { files, fileMetadata } = variables;
      return await uploadService.createTm(files, fileMetadata);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tms"] });
      return navigateToTms();
    },
    onError: (error: Error) => {
      toast.error(`Could not upload translation memory: ${error}`, {
        classNames: {
          toast: "bg-red-200",
        },
      });
    },
  });
  const { navigateToTms } = useTranslationRoute();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!sourceFile || !targetFile) {
      toast.error("Please select both source and target files");
      return;
    }

    mutate({
      files: [sourceFile, targetFile],
      fileMetadata: { sourceLang, targetLang, domain },
    });
  }

  function onSourceLangChange(lang: Lang) {
    setSourceLang(lang);
  }

  function onTargetLangChange(lang: Lang) {
    setTargetLang(lang);
  }

  function onDomainChange(domain: Domain) {
    setDomain(domain);
  }

  function removeSourceFile() {
    setSourceFile(null);
  }

  function removeTargetFile() {
    setTargetFile(null);
  }

  return {
    sourceFile,
    targetFile,
    setSourceFile,
    setTargetFile,
    removeSourceFile,
    removeTargetFile,
    isLoading,
    sourceLang,
    setSourceLang,
    targetLang,
    setTargetLang,
    domain,
    setDomain,
    handleSubmit,
    onSourceLangChange,
    onTargetLangChange,
    onDomainChange,
    domainItems,
    langItems,
  };
}
