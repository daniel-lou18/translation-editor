import { Translation } from "@/types";
import Combobox, { ComboDataElement } from "@/components/ui/Combobox";

export default function SelectTranslation({
  translations,
}: {
  translations: Translation[];
}) {
  const data: ComboDataElement[] = translations.map((translation) => ({
    label: translation.fileName,
    value: translation.name,
  }));
  return <Combobox name="translations" data={data} />;
}
