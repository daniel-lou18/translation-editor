import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress-bar";
import { Globe } from "lucide-react";
import Container from "@/components/ui/Container";
import TableRowMenu from "@/components/ui/Table/TableRowMenu";
import { FormattedTranslation } from "@/types/Translation";
import { TableRowMenuProps } from "@/components/ui/Table/TableRowMenu";
type TranslationsTableRowProps = {
  data: FormattedTranslation;
  onClick: (documentId: number, translationId: number) => void;
  rowMenuData: Omit<TableRowMenuProps<FormattedTranslation>, "data">;
};

export default function TranslationsTableRow({
  data,
  onClick,
  rowMenuData,
}: TranslationsTableRowProps) {
  const { id, documentId, fileName, targetLang, progress, status, updatedAt } =
    data;

  return (
    <TableRow key={id} className="hover:bg-gray-200/50 hover:cursor-pointer">
      <TableCell onClick={() => onClick(documentId, id)} className="pl-1">
        <Container className="flex items-center gap-2">
          <Globe className="h-4 w-4" strokeWidth={1.5} />
          {targetLang}
        </Container>
      </TableCell>
      <TableCell onClick={() => onClick(documentId, id)}>{fileName} </TableCell>
      <TableCell onClick={() => onClick(documentId, id)} className="min-w-36">
        <Container className="flex items-center gap-2">
          <Progress value={progress} className="w-[60%] h-2" />
          <Container as="span" className="text-xs text-muted-foreground">
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
        <TableRowMenu {...rowMenuData} data={data} />
      </TableCell>
    </TableRow>
  );
}
