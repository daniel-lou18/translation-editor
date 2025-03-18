import { DocumentWithTranslations, NormalizedTranslations } from "@/types";
import Combobox from "@/components/ui/Combobox";
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

  const items = Object.values(translations).map((translation) => ({
    label: `${currentDocument.sourceLang} > ${translation.targetLang}`,
    value: String(translation.id),
  }));

  const currentId = currentTranslation ? String(currentTranslation.id) : null;

  return (
    <Combobox
      name="translation"
      items={items}
      value={currentId || ""}
      onChange={onSelect}
      className="bg-white h-9 border-border"
    />
  );
}
