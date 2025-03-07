import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText } from "lucide-react";
import { Document } from "@/types";
import TableRowMenu from "../../ui/Table/TableRowMenu";
import { useEditTable } from "@/hooks/useEditTable";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import Container from "@/components/ui/Container";
import EditableCell from "../../ui/Table/EditableCell";
import TableRowControls from "@/components/ui/Table/TableRowControls";
type TranslationsTableProps = {
  documents: Document[];
  onClick: (documentId: number) => void;
};

export default function DocumentsTable({
  documents,
  onClick,
}: TranslationsTableProps) {
  const { navigateToTranslations } = useTranslationRoute();
  const {
    editingId,
    editFormData,
    setEditingId,
    setEditFormData,
    handleInputChange,
    handleCancel,
    handleSave,
  } = useEditTable<Document>(() => {});

  const documentRowMenuData = {
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
        onClick: () => {},
      },
    ],
  };
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="pl-0">File</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Domain</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="w-[100px] pr-0">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.length > 0 ? (
          documents.map((doc) => {
            const { id, fileName, sourceLang, domain, docType, createdAt } =
              doc;
            return (
              <TableRow
                key={id}
                className="hover:bg-gray-200/50 hover:cursor-pointer"
              >
                <TableCell className="pl-1" onClick={() => onClick(id)}>
                  <Container className="flex items-center gap-2">
                    <FileText className="h-4 w-4" strokeWidth={1.5} />
                    <EditableCell
                      inputConfig={{
                        field: "fileName",
                        onChange: handleInputChange,
                        editFormData: editFormData,
                      }}
                      displayConfig={{
                        value: fileName,
                      }}
                      isEditing={editingId === id}
                    />
                  </Container>
                </TableCell>
                <TableCell onClick={() => onClick(id)}>{sourceLang}</TableCell>
                <TableCell onClick={() => onClick(id)}>{domain}</TableCell>
                <TableCell onClick={() => onClick(id)}>
                  {docType || "document"}
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
                    <TableRowMenu {...documentRowMenuData} data={doc} />
                  )}
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center">
              No documents found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
