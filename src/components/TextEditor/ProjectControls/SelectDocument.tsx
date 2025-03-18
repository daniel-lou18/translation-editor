import { DocumentWithTranslations, NormalizedDocsWithTrans } from "@/types";
import Combobox from "@/components/ui/Combobox";

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
  const items = Object.values(documents).map((document) => ({
    label: document.fileName,
    value: String(document.id),
  }));
  const currentId = currentDocument ? String(currentDocument.id) : null;

  return (
    <Combobox
      name="document"
      items={items}
      value={currentId || ""}
      onChange={onSelect}
      className="bg-white h-9 border-border"
    />
  );
}
