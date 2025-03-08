import { useEditTable } from "@/hooks/useEditTable";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import { Document } from "@/types";
import DocumentsTableRow from "./DocumentsTableRow";
import { useDeleteDoc } from "@/hooks/useDeleteDoc";
import { useUpdateDoc } from "@/hooks/useUpdateDoc";

type DocumentsTableBodyProps = {
  docs: Document[];
};

export default function DocumentsTableBody({ docs }: DocumentsTableBodyProps) {
  const { navigateToTranslations } = useTranslationRoute();
  const { deleteDoc, isDeleting } = useDeleteDoc();
  const { updateDoc, isSaving } = useUpdateDoc();
  const { setEditingId, setEditFormData, ...restProps } =
    useEditTable<Document>(updateDoc);

  const docsRowMenuData = {
    name: "document",
    items: [
      {
        value: "Edit",
        onClick: (doc: Document) => {
          setEditingId(doc.id);
          setEditFormData({ ...doc });
        },
      },
      {
        value: "View translations",
        onClick: (doc: Document) => {
          navigateToTranslations(doc.id);
        },
      },
      {
        value: "View details",
        onClick: () => {},
      },
      {
        value: "Delete",
        onClick: (doc: Document) => {
          deleteDoc(doc.id);
        },
      },
    ],
  };

  return docs.map((doc) => (
    <DocumentsTableRow
      key={doc.id}
      data={doc}
      isSaving={isSaving || isDeleting}
      rowMenuData={docsRowMenuData}
      {...restProps}
    />
  ));
}
