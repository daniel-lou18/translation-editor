import { useEditTable } from "@/hooks/useEditTable";
import { useRoute } from "@/hooks/useRoute";
import { Document } from "@/types";
import DocumentsTableRow from "./DocumentsTableRow";
import { useDeleteDoc } from "@/hooks/useDeleteDoc";
import { useUpdateDoc } from "@/hooks/useUpdateDoc";

type DocumentsTableBodyProps = {
  docs: Document[];
};

export default function DocumentsTableBody({ docs }: DocumentsTableBodyProps) {
  const {
    navigateToTranslations,
    navigateToDocumentDetails,
    navigateToDocumentPreview,
  } = useRoute();
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
        value: "View document",
        onClick: (doc: Document) => {
          navigateToDocumentPreview(doc.id);
        },
      },
      {
        value: "See translations",
        onClick: (doc: Document) => {
          navigateToTranslations(doc.id);
        },
      },
      {
        value: "Display statistics",
        onClick: (doc: Document) => {
          navigateToDocumentDetails(doc.id);
        },
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
