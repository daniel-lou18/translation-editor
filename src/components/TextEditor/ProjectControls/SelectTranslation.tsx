import { DocumentWithTranslations } from "@/types";
import Combobox, { ComboDataElement } from "@/components/ui/Combobox";
import { useCallback } from "react";

type SelectTranslationProps = {
  currentDocument: DocumentWithTranslations | null;
  navigateTo: (
    projectId: string,
    documentId: string,
    translationId: string
  ) => void;
};

export default function SelectTranslation({
  currentDocument,
  navigateTo,
}: SelectTranslationProps) {
  const items: ComboDataElement[] = currentDocument?.translations
    ? currentDocument.translations.map((translation) => ({
        id: translation.id.toString(),
        label: `${currentDocument.sourceLang} > ${translation.targetLang}`,
        value: `${currentDocument.sourceLang} > ${translation.targetLang}`,
      }))
    : [];

  const currentValue = currentDocument?.translations
    ? `${currentDocument.sourceLang} > ${currentDocument.translations[0].targetLang}`
    : null;

  const handleNavigate = useCallback(
    (translationId: string) => {
      if (!currentDocument?.translations) return;

      navigateTo(
        currentDocument.projectId.toString(),
        currentDocument.id.toString(),
        translationId
      );
    },
    [
      currentDocument?.id,
      currentDocument?.projectId,
      currentDocument?.translations,
      navigateTo,
    ]
  );

  return (
    <Combobox
      name="translations"
      items={items}
      value={currentValue}
      onChange={handleNavigate}
    />
  );
}
