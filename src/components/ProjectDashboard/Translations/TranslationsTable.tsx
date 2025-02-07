import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress-bar";
import { Globe } from "lucide-react";
import { FormattedTranslation } from "@/types/Translation";
import TableRowMenu, { TableRowMenuProps } from "../TableRowMenu";

type TranslationsTableProps = {
  translations: FormattedTranslation[];
  onClick: (documentId: string, translationId: string) => void;
};

const translationRowMenuData: TableRowMenuProps = {
  name: "translation",
  items: ["Open translation", "View details"],
};

export default function TranslationsTable({
  translations,
  onClick,
}: TranslationsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="pl-0">Document</TableHead>
          <TableHead>Language</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last update</TableHead>
          <TableHead className="w-[100px] pr-0">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {translations.map(
          ({
            id,
            documentId,
            fileName,
            targetLang,
            progress,
            status,
            updatedAt,
          }) => (
            <TableRow
              key={id}
              className="hover:bg-gray-200/50 hover:cursor-pointer"
            >
              <TableCell className="pl-1">{fileName} </TableCell>
              <TableCell onClick={() => onClick(documentId, id)}>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" strokeWidth={1.5} />
                  {targetLang}
                </div>
              </TableCell>
              <TableCell onClick={() => onClick(documentId, id)}>
                <div className="flex items-center gap-2">
                  <Progress value={progress} className="w-[60%] h-2" />
                  <span className="text-xs text-muted-foreground">
                    {progress}%
                  </span>
                </div>
              </TableCell>
              <TableCell onClick={() => onClick(documentId, id)}>
                <Badge
                  variant="outline"
                  className={`${
                    status === "Completed"
                      ? "bg-green-300"
                      : status === "In Progress"
                      ? "bg-yellow-300"
                      : ""
                  }`}
                >
                  {status}
                </Badge>
              </TableCell>
              <TableCell onClick={() => onClick(documentId, id)}>
                {new Date(updatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="pr-1">
                <TableRowMenu {...translationRowMenuData} />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
