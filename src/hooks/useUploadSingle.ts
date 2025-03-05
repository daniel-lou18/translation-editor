import { useState } from "react";
import { useFileManager } from "@/hooks/useFileManager";
import { Lang, Domain } from "@/types";
import { domains } from "@/utils/constants";
import { languages } from "@/utils/constants";

export function useUploadSingle() {
  const { files, processFiles, removeFile } = useFileManager();
  const [sourceLang, setSourceLang] = useState<Lang>("English (USA)");
  const [targetLang, setTargetLang] = useState<Lang>("French (France)");
  const [domain, setDomain] = useState<Domain>("legal");

  const domainItems = domains.map((domain) => ({
    value: domain,
    label: domain,
  }));

  const langItems: Array<{ value: Lang; label: Lang }> = Object.keys(
    languages
  ).map((lang) => ({
    value: lang as Lang,
    label: lang as Lang,
  }));

  return {
    file: files[0]?.file,
    files,
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
  };
}
