import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableRowMenu from "../TableRowMenu";
import { Tm } from "@/types/Tm";
import Container from "@/components/ui/Container";
import { BookType, Save, X } from "lucide-react";
import EditableCell from "./EditableCell";
import { useState } from "react";
import { useDeleteTm } from "@/hooks/useDeleteTm";
import { Button } from "@/components/ui/button";
type TmsTableProps = {
  tms: Tm[];
  onRowClick: (tmId: number) => void;
};

export default function TmsTable({ tms, onRowClick }: TmsTableProps) {
  const { mutate: deleteTm } = useDeleteTm();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Tm>>({});

  const handleInputChange = (field: keyof Tm, value: string) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const tmsRowMenuData = {
    name: "tm",
    items: [
      {
        value: "View details",
        onClick: () => {},
      },
      {
        value: "Edit",
        onClick: (tm: Tm) => {
          setEditingId(tm.id);
          setEditFormData({ ...tm });
        },
      },
      {
        value: "Export",
        onClick: () => {},
      },
      {
        value: "Delete",
        onClick: (tm: Tm) => {
          deleteTm(tm.id);
        },
      },
    ],
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="pl-0">Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Source lang</TableHead>
          <TableHead>Target lang</TableHead>
          <TableHead>Domain</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="w-[100px] pr-0">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tms.length > 0 ? (
          tms.map((tm) => {
            const {
              id,
              name,
              description,
              sourceLang,
              targetLang,
              domain,
              createdAt,
            } = tm;
            const isEditing = editingId === id;

            return (
              <TableRow
                key={id}
                className="hover:bg-gray-200/50 hover:cursor-pointer"
              >
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
                <TableCell onClick={() => onRowClick(id)}>
                  {sourceLang}
                </TableCell>
                <TableCell onClick={() => onRowClick(id)}>
                  {targetLang}
                </TableCell>
                <TableCell onClick={() => onRowClick(id)}>{domain}</TableCell>
                <TableCell onClick={() => onRowClick(id)}>
                  {new Date(createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="pr-1">
                  {isEditing ? (
                    <Container className="flex items-center gap-1">
                      <Button variant="ghost" className="w-4 h-4">
                        <Save />
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-4 h-4"
                        onClick={handleCancel}
                      >
                        <X />
                      </Button>
                    </Container>
                  ) : (
                    <TableRowMenu {...tmsRowMenuData} data={tm} />
                  )}
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              No TMs found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
