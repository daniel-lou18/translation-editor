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

type UploadConfig = {
  type: "create" | "add";
  tmId?: string;
};

export function useTmUpload(config: UploadConfig) {
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
  const { navigateToTms } = useTranslationRoute();

  const { mutate, isPending: isLoading } = useBaseMutation({
    mutationFn: async (
      variables: CreateTmVariables
    ): Promise<DocumentPairId> => {
      const uploadFunction =
        config.type === "create"
          ? uploadService.createTm
          : uploadService.addTmPairs;
      const { files, fileMetadata } = variables;

      return await uploadFunction(files, fileMetadata);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tms"] });
      toast.success(
        config.type === "create"
          ? "Successfully created translation memory"
          : "Successfully added segments to translation memory"
      );
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!sourceFile || !targetFile) {
      toast.error("Please select both source and target files");
      return;
    }

    mutate({
      files: [sourceFile, targetFile],
      fileMetadata: { sourceLang, targetLang, domain, tmId: config.tmId },
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
