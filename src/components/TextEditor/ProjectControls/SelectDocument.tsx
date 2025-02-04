import { DocumentWithTranslations, NormalizedDocsWithTrans } from "@/types";
import Combobox, { ComboDataElement } from "@/components/ui/Combobox";

type SelectDocumentProps = {
  documents: NormalizedDocsWithTrans;
  currentDocument: DocumentWithTranslations | null;
  onSelect: (documentId: string) => void;
};

export default function SelectDocument({
  documents,
  currentDocument,
  onSelect,
}: SelectDocumentProps) {
  const items: ComboDataElement[] = Object.values(documents).map(
    (document) => ({
      label: document.fileName,
      value: String(document.id),
    })
  );
  const currentValue = currentDocument ? currentDocument.fileName : null;

  return (
    <Combobox
      name="documents"
      items={items}
      value={currentValue}
      onChange={onSelect}
    />
  );
}
