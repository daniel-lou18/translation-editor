import { FormEvent, useState, useCallback } from "react";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import { Lang, Domain } from "@/types";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateTm } from "./useCreateTm";
import { domains } from "@/utils/constants";

export function useTmUpload() {
  const queryClient = useQueryClient();
  const { mutate, isPending: isLoading } = useCreateTm();
  const { navigateToTms } = useTranslationRoute();
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [targetFile, setTargetFile] = useState<File | null>(null);
  const [sourceLang, setSourceLang] = useState<Lang>("English (USA)");
  const [targetLang, setTargetLang] = useState<Lang>("French (France)");
  const [domain, setDomain] = useState<Domain>("legal");

  const domainItems = domains.map((domain) => ({
    value: domain,
    label: domain,
  }));

  const handleSuccess = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["tms"] });
    return navigateToTms();
  }, [navigateToTms, queryClient]);

  const handleError = useCallback((error: Error) => {
    toast.error(`Could not upload translation memory: ${error}`, {
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

    mutate(
      {
        files: [sourceFile, targetFile],
        fileMetadata: { sourceLang, targetLang, domain },
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
  };
}
