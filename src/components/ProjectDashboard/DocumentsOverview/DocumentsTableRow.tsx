import Container from "@/components/ui/Container";
import { TableCell } from "@/components/ui/table";
import { TableRow } from "@/components/ui/table";
import EditableCell from "@/components/ui/Table/EditableCell";
import TableRowControls from "@/components/ui/Table/TableRowControls";
import TableRowMenu from "@/components/ui/Table/TableRowMenu";
import { FileText } from "lucide-react";
import { TableRowProps } from "@/components/ui/Table/types";
import { Document } from "@/types/Document";
import { useRoute } from "@/hooks/useRoute";

type DocumentsTableRowProps = TableRowProps<Document>;

export default function DocumentsTableRow({
  data,
  editingId,
  handleInputChange,
  editFormData,
  handleSave,
  handleCancel,
  isSaving,
  rowMenuData,
}: DocumentsTableRowProps) {
  const { navigateToTranslations } = useRoute();
  const { id, fileName, sourceLang, domain, docType, createdAt } = data;
  const isEditing = editingId === id;

  console.log(editFormData);

  const onClick = (documentId: number) => {
    if (!documentId) return;
    navigateToTranslations(documentId);
  };

  return (
    <TableRow key={id} className="hover:bg-gray-200/50 hover:cursor-pointer">
      <TableCell className="pl-1" onClick={() => onClick(id)}>
        <Container className="flex items-center gap-2">
          <FileText className="h-4 w-4" strokeWidth={1.5} />
          {fileName}
        </Container>
      </TableCell>
      <TableCell onClick={() => onClick(id)}>
        <EditableCell
          inputConfig={{
            field: "sourceLang",
            onChange: handleInputChange,
            editFormData: editFormData,
          }}
          displayConfig={{
            value: sourceLang || "fr_FR",
          }}
          isEditing={editingId === id}
        />
      </TableCell>
      <TableCell onClick={() => onClick(id)}>
        <EditableCell
          inputConfig={{
            field: "domain",
            onChange: handleInputChange,
            editFormData: editFormData,
          }}
          displayConfig={{
            value: domain || "general",
          }}
          isEditing={editingId === id}
        />
      </TableCell>
      <TableCell onClick={() => onClick(id)}>
        <EditableCell
          inputConfig={{
            field: "docType",
            onChange: handleInputChange,
            editFormData: editFormData,
          }}
          displayConfig={{
            value: docType || "document",
          }}
          isEditing={editingId === id}
        />
      </TableCell>
      <TableCell onClick={() => onClick(id)}>
        {new Date(createdAt).toLocaleDateString()}
      </TableCell>
      <TableCell className="pr-1">
        {isEditing ? (
          <TableRowControls
            handleSave={handleSave}
            handleCancel={handleCancel}
            isSaving={isSaving}
          />
        ) : (
          <TableRowMenu {...rowMenuData} data={data} />
        )}
      </TableCell>
    </TableRow>
  );
}
