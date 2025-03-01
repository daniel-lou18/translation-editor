import { FormEvent, useState, useCallback } from "react";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useAddTmPairs } from "./useAddTmPairs";
import { useSelectTm } from "./useSelectTm";
import { Domain } from "@/types";
import { Lang } from "@/types";

export function useAddTmSegments() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useAddTmPairs();
  const { tmId } = useSelectTm();
  const { navigateToTms } = useTranslationRoute();
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [targetFile, setTargetFile] = useState<File | null>(null);
  const [sourceLang, setSourceLang] = useState<Lang>("English (USA)");
  const [targetLang, setTargetLang] = useState<Lang>("French (France)");
  const [domain, setDomain] = useState<Domain>("legal");

  const handleSuccess = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["tms"] });
    toast.success("Successfully added segments to translation memory");
    return navigateToTms();
  }, [navigateToTms, queryClient]);

  const handleError = useCallback((error: Error) => {
    toast.error(`Could not add segments to translation memory: ${error}`, {
      classNames: {
        toast: "bg-red-200",
      },
    });
  }, []);

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

    mutate(
      {
        files: [sourceFile, targetFile],
        fileMetadata: { tmId, sourceLang, targetLang, domain },
      },
      {
        onSuccess: handleSuccess,
        onError: handleError,
      }
    );
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
  };
}
