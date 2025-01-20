import { DocumentWithTranslations, NormalizedDocsWithTrans } from "@/types";
import Combobox, { ComboDataElement } from "@/components/ui/Combobox";
import { useCallback } from "react";

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

  const handleNavigate = useCallback(
    (documentId: string) => {
      if (!currentDocument) return;

      const translationId = documents[documentId].translations[0].id.toString();

      navigateTo(
        currentDocument.projectId.toString(),
        documentId,
        translationId
      );
    },
    [documents, currentDocument, navigateTo]
  );

  return (
    <Combobox
      name="documents"
      items={items}
      value={currentValue}
      onChange={handleNavigate}
    />
  );
}
