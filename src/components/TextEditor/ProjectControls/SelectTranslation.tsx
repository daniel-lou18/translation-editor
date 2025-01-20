import { DocumentWithTranslations } from "@/types";
import Combobox, { ComboDataElement } from "@/components/ui/Combobox";

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
        value: translation.targetLang,
      }))
    : [];

  const currentValue = currentDocument?.translations
    ? `${currentDocument.sourceLang} > ${currentDocument.translations[0].targetLang}`
    : null;

  function handleNavigate(translationId: string) {
    if (!currentDocument?.translations) return;

    navigateTo(
      currentDocument.projectId.toString(),
      currentDocument.id.toString(),
      translationId
    );
  }

  return (
    <Combobox
      name="translations"
      items={items}
      value={currentValue}
      onChange={handleNavigate}
    />
  );
}
