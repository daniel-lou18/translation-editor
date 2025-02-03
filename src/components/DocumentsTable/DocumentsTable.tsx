import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { File, MoreHorizontal } from "lucide-react";
import Container from "../ui/Container";
import { Document } from "@/types";

type TranslationsTableProps = {
  documents: Document[];
  onClick: (documentId: number) => void;
};

export default function DocumentsTable({
  documents,
  onClick,
}: TranslationsTableProps) {
  return (
    <Container className="px-12 py-6">
      <h1 className="font-bold text-2xl mb-2">Documents</h1>
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
          {documents.map(
            ({ id, fileName, sourceLang, domain, docType, createdAt }) => (
              <TableRow
                key={id}
                onClick={() => onClick(id)}
                className="hover:bg-gray-200 hover:cursor-pointer"
              >
                <TableCell className="pl-1 rounded-l-lg">
                  <div className="flex items-center gap-2">
                    <File className="h-4 w-4" strokeWidth={1.5} />
                    {fileName}
                  </div>
                </TableCell>
                <TableCell>{sourceLang}</TableCell>
                <TableCell>{domain}</TableCell>
                <TableCell>{docType || "document"}</TableCell>
                <TableCell>
                  {new Date(createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="pr-1 rounded-r-lg">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Update progress</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Delete translation</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Container>
  );
}
