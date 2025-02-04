import { DocumentWithTranslations, NormalizedTranslations } from "@/types";
import Combobox, { ComboDataElement } from "@/components/ui/Combobox";
import { Translation } from "@/types/Translation";

type SelectTranslationProps = {
  currentDocument: DocumentWithTranslations | null;
  translations: NormalizedTranslations;
  currentTranslation: Translation | null;
  onSelect: (translationId: string) => void;
};

export default function SelectTranslation({
  currentDocument,
  translations,
  currentTranslation,
  onSelect,
}: SelectTranslationProps) {
  if (!currentDocument || Object.values(translations).length === 0) return null;

  const items: ComboDataElement[] = Object.values(translations).map(
    (translation) => ({
      label: `${currentDocument.sourceLang} > ${translation.targetLang}`,
      value: String(translation.id),
    })
  );

  const currentValue =
    currentDocument.sourceLang && currentTranslation?.targetLang
      ? `${currentDocument.sourceLang} > ${currentTranslation.targetLang}`
      : null;

  return (
    <Combobox
      name="translations"
      items={items}
      value={currentValue}
      onChange={onSelect}
    />
  );
}
