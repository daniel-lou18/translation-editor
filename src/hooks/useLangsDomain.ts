import { Lang } from "@/types";
import { Domain } from "@/types";
import { domains, languageToCodeMap } from "@/utils/constants";
import { useMemo, useState } from "react";

export function useLangsDomain() {
  const [sourceLang, setSourceLang] = useState<Lang>("English (USA)");
  const [targetLang, setTargetLang] = useState<Lang>("French (France)");
  const [domain, setDomain] = useState<Domain>("legal");

  const domainItems = useMemo(
    () =>
      domains.map((domain) => ({
        value: domain,
        label: domain,
      })),
    []
  );

  const langItems = useMemo(
    () =>
      Object.keys(languageToCodeMap).map((lang) => ({
        value: lang as Lang,
        label: lang as Lang,
      })),
    []
  );

  return {
    sourceLang,
    targetLang,
    domain,
    setSourceLang,
    setTargetLang,
    setDomain,
    domainItems,
    langItems,
  };
}
