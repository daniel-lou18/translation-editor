import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { File } from "lucide-react";
import TableRowMenu, { TableRowMenuProps } from "../TableRowMenu";
import { TmDocumentPair } from "@/types/Tm";

type TmsTableProps = {
  documentPairs: TmDocumentPair[];
  onClick: (documentPairId: number) => void;
};

const tmsRowMenuData: TableRowMenuProps = {
  name: "document pair",
  items: ["View details", "Export"],
};

export default function TmsTable({
  documentPairs,
  onClick,
}: TmsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="pl-0">Source file</TableHead>
          <TableHead>Target file</TableHead>
          <TableHead>Source lang</TableHead>
          <TableHead>Target lang</TableHead>
          <TableHead>Domain</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="w-[100px] pr-0">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documentPairs.length > 0 ? documentPairs.map(
          ({ id, sourceFile, targetFile, sourceLang, targetLang, domain, createdAt }) => (
            <TableRow
              key={id}
              className="hover:bg-gray-200/50 hover:cursor-pointer"
            >
              <TableCell className="pl-1 text-xs" onClick={() => onClick(id)}>
                <div className="flex items-center gap-2">
                  {sourceFile}
                </div>
              </TableCell>
              <TableCell className="text-xs" onClick={() => onClick(id)}>
                <div className="flex items-center gap-2">
                  {targetFile}
                </div>
              </TableCell>
              <TableCell onClick={() => onClick(id)}>{sourceLang}</TableCell>
              <TableCell onClick={() => onClick(id)}>{targetLang}</TableCell>
              <TableCell onClick={() => onClick(id)}>{domain}</TableCell>
              <TableCell onClick={() => onClick(id)}>
                {new Date(createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="pr-1">
                <TableRowMenu {...tmsRowMenuData} />
              </TableCell>
            </TableRow>
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
