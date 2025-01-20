import { DocumentWithTranslations, NormalizedDocsWithTrans } from "@/types";
import Combobox, { ComboDataElement } from "@/components/ui/Combobox";

type SelectDocumentProps = {
  documents: NormalizedDocsWithTrans;
  currentDocument: DocumentWithTranslations | null;
  navigateTo: (
    projectId: string,
    documentId: string,
    translationId: string
  ) => void;
};

export default function SelectDocument({
  documents,
  currentDocument,
  navigateTo,
}: SelectDocumentProps) {
  const items: ComboDataElement[] = Object.values(documents).map(
    (document) => ({
      id: document.id.toString(),
      label: document.fileName,
      value: document.fileName,
    })
  );
  const currentValue = currentDocument ? currentDocument.fileName : null;

  function handleNavigate(documentId: string) {
    if (!currentDocument) return;
    navigateTo(
      currentDocument.projectId.toString(),
      documentId,
      currentDocument.translations[0].id.toString()
    );
  }

  return (
    <Combobox
      name="documents"
      items={items}
      value={currentValue}
      onChange={handleNavigate}
    />
  );
}
