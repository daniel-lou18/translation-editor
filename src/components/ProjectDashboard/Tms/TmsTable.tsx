import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableRowMenu, { TableRowMenuProps } from "../TableRowMenu";
import { Tm } from "@/types/Tm";
import Container from "@/components/ui/Container";
import { BookType } from "lucide-react";

type TmsTableProps = {
  tms: Tm[];
  onRowClick: (tmId: number) => void;
  rowMenuConfig: Omit<TableRowMenuProps, "id">;
};

export default function TmsTable({
  tms,
  onRowClick,
  rowMenuConfig,
}: TmsTableProps) {
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
          tms.map(
            ({
              id,
              name,
              description,
              sourceLang,
              targetLang,
              domain,
              createdAt,
            }) => (
              <TableRow
                key={id}
                className="hover:bg-gray-200/50 hover:cursor-pointer"
              >
                <TableCell className="pl-1" onClick={() => onRowClick(id)}>
                  <Container className="flex items-center gap-2">
                    <BookType className="h-4 w-4" strokeWidth={1.5} />
                    <div className="flex items-center gap-2">
                      {name.length > 50 ? `${name.slice(0, 50)}...` : name}
                    </div>
                  </Container>
                </TableCell>
                <TableCell onClick={() => onRowClick(id)}>
                  <div className="flex items-center gap-2">
                    {description && description.length > 50
                      ? `${description.slice(0, 50)}...`
                      : description}
                  </div>
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
                  <TableRowMenu {...rowMenuConfig} id={id} />
                </TableCell>
              </TableRow>
            )
          )
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
