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
import TableRowMenu, { TableRowMenuProps } from "../TableRowMenu";

type TranslationsTableProps = {
  documents: Document[];
  onClick: (documentId: number) => void;
};

const documentRowMenuData: TableRowMenuProps = {
  name: "document",
  items: ["View translations", "View details"],
};

export default function DocumentsTable({
  documents,
  onClick,
}: TranslationsTableProps) {
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
        {documents.length > 0 ? documents.map(
          ({ id, fileName, sourceLang, domain, docType, createdAt }) => (
            <TableRow
              key={id}
              className="hover:bg-gray-200/50 hover:cursor-pointer"
            >
              <TableCell className="pl-1" onClick={() => onClick(id)}>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" strokeWidth={1.5} />
                  {fileName}
                </div>
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
                <TableRowMenu {...documentRowMenuData} />
              </TableCell>
            </TableRow>
          )
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
