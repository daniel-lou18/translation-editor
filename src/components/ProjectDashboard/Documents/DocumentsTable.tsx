import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DocumentsTableBody from "./DocumentsTableBody";
import { useCurrentProject } from "@/hooks/useCurrentProject";

export default function DocumentsTable() {
  const { currentDocuments } = useCurrentProject();
  const documents = Object.values(currentDocuments || {});

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
          <DocumentsTableBody docs={documents} />
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
