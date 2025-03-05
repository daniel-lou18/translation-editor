import { Lang } from "@/types";
import { Domain } from "@/types";
import { domains, languages } from "@/utils/constants";
import { useState } from "react";

export function useUploadDouble() {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [targetFile, setTargetFile] = useState<File | null>(null);
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
  };
}
