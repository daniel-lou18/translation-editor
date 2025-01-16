import { NormalizedTranslations, Translation } from "@/types";
import Combobox, { ComboDataElement } from "@/components/ui/Combobox";

type SelectTranslationProps = {
  translations: NormalizedTranslations;
  currentTranslation: Translation | null;
  navigateTo: (projectId: string, translationId: string) => void;
};

export default function SelectTranslation({
  translations,
  currentTranslation,
  navigateTo,
}: SelectTranslationProps) {
  const items: ComboDataElement[] = Object.values(translations).map(
    (translation) => ({
      id: translation.id.toString(),
      label: translation.fileName,
      value: translation.name,
    })
  );
  const currentValue = currentTranslation ? currentTranslation.fileName : null;

  function handleNavigate(translationId: string) {
    if (!currentTranslation) return;
    navigateTo(currentTranslation.projectId.toString(), translationId);
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
