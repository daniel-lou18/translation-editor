import TableRowControls from "@/components/ui/Table/TableRowControls";
import { TableRow } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table";
import Container from "@/components/ui/Container";
import EditableCell from "@/components/ui/Table/EditableCell";
import { BookType } from "lucide-react";
import { Tm } from "@/types/Tm";
import { TableRowProps } from "@/components/ui/Table/types";
import TableRowMenu from "@/components/ui/Table/TableRowMenu";
import { useTmRoute } from "@/hooks/useTmRoute";

type TmsTableRowProps = TableRowProps<Tm>;

export default function TmsTableRow({
  data,
  editingId,
  handleInputChange,
  editFormData,
  handleSave,
  handleCancel,
  isSaving,
  rowMenuData,
}: TmsTableRowProps) {
  const { navigateToTm } = useTmRoute();
  const { id, name, description, sourceLang, targetLang, domain, createdAt } =
    data;
  const isEditing = editingId === id;

  const onRowClick = (tmId: number) => {
    if (!tmId) return;
    navigateToTm(tmId);
  };

  return (
    <TableRow key={id} className="hover:bg-gray-200/50 hover:cursor-pointer">
      <TableCell className="pl-1" onClick={() => onRowClick(id)}>
        <Container className="flex items-center gap-2">
          <BookType className="h-4 w-4" strokeWidth={1.5} />
          <EditableCell
            inputConfig={{
              field: "name",
              onChange: handleInputChange,
              editFormData: editFormData,
            }}
            displayConfig={{
              value: name,
            }}
            isEditing={isEditing}
          />
        </Container>
      </TableCell>
      <TableCell onClick={() => onRowClick(id)}>
        <EditableCell
          inputConfig={{
            field: "description",
            editFormData: editFormData,
            onChange: handleInputChange,
          }}
          displayConfig={{
            value: description || "No description",
          }}
          isEditing={isEditing}
        />
      </TableCell>
      <TableCell onClick={() => onRowClick(id)}>{sourceLang}</TableCell>
      <TableCell onClick={() => onRowClick(id)}>{targetLang}</TableCell>
      <TableCell onClick={() => onRowClick(id)}>{domain}</TableCell>
      <TableCell onClick={() => onRowClick(id)}>
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
