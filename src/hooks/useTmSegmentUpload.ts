import { FormEvent } from "react";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useSelectTm } from "./useSelectTm";
import { Domain } from "@/types";
import { Lang } from "@/types";
import { useUploadDouble } from "./useUploadDouble";
import { useBaseMutation } from "./useBaseMutation";
import { DocumentPairId, AddTmPairsDTO } from "@/types/Dtos";
import { uploadService } from "@/services/uploadService";

export type AddTmPairsVariables = {
  files: File[];
  fileMetadata: AddTmPairsDTO;
};

export function useAddTmSegments() {
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

  const { mutate, isPending } = useBaseMutation({
    mutationFn: async (
      variables: AddTmPairsVariables
    ): Promise<DocumentPairId> => {
      const { files, fileMetadata } = variables;
      return await uploadService.addTmPairs(files, fileMetadata);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tms"] });
      toast.success("Successfully added segments to translation memory");
      return navigateToTms();
    },
    onError: (error: Error) => {
      toast.error(`Could not add segments to translation memory: ${error}`, {
        classNames: {
          toast: "bg-red-200",
        },
      });
    },
  });

  const { tmItems, tmId, onTmChange } = useSelectTm();
  const { navigateToTms } = useTranslationRoute();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!sourceFile || !targetFile) {
      toast.error("Please select both source and target files");
      return;
    }

    if (!tmId) {
      toast.error("Please select a translation memory");
      return;
    }

    mutate({
      files: [sourceFile, targetFile],
      fileMetadata: { tmId, sourceLang, targetLang, domain },
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
    isLoading: isPending,
    handleSubmit,
    onSourceLangChange,
    onTargetLangChange,
    onDomainChange,
    tmItems,
    tmId,
    onTmChange,
    sourceLang,
    targetLang,
    domain,
    domainItems,
    langItems,
  };
}
