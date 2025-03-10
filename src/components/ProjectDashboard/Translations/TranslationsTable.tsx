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
import TableRowMenu, { TableRowMenuProps } from "../../ui/Table/TableRowMenu";
import Container from "@/components/ui/Container";

type TranslationsTableProps = {
  translations: FormattedTranslation[];
  onClick: (documentId: number, translationId: number) => void;
};

const translationRowMenuData: TableRowMenuProps = {
  name: "translation",
  items: [
    {
      value: "Open translation",
      onClick: () => {},
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

export default function TranslationsTable({
  translations,
  onClick,
}: TranslationsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="pl-0">Language</TableHead>
          <TableHead>Document</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last update</TableHead>
          <TableHead className="w-[100px] pr-0">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {translations.length > 0 ? (
          translations.map(
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
                <TableCell
                  onClick={() => onClick(documentId, id)}
                  className="pl-1"
                >
                  <Container className="flex items-center gap-2">
                    <Globe className="h-4 w-4" strokeWidth={1.5} />
                    {targetLang}
                  </Container>
                </TableCell>
                <TableCell onClick={() => onClick(documentId, id)}>
                  {fileName}{" "}
                </TableCell>
                <TableCell
                  onClick={() => onClick(documentId, id)}
                  className="min-w-36"
                >
                  <Container className="flex items-center gap-2">
                    <Progress value={progress} className="w-[60%] h-2" />
                    <Container
                      as="span"
                      className="text-xs text-muted-foreground"
                    >
                      {progress}%
                    </Container>
                  </Container>
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
          )
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center">
              No translations found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
