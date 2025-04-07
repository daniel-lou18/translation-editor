import { TableRow, TableCell } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress-bar";
import { Globe } from "lucide-react";
import Container from "@/components/ui/Container";
import TableRowMenu from "@/components/ui/Table/TableRowMenu";
import { FormattedTranslation } from "@/types/Translation";
import { TableRowMenuProps } from "@/components/ui/Table/TableRowMenu";
import { useRoute } from "@/hooks/useRoute";
import TranslationStatusBadge from "@/components/ui/TranslationStatusBadge";
import { translationStatusConfig } from "@/config/translationsTable";

type TranslationsTableRowProps = {
  data: FormattedTranslation;
  rowMenuData: Omit<TableRowMenuProps<FormattedTranslation>, "data">;
};

export default function TranslationsTableRow({
  data,
  rowMenuData,
}: TranslationsTableRowProps) {
  const { navigateToTranslation, projectId } = useRoute();
  const { id, documentId, fileName, targetLang, progress, status, updatedAt } =
    data;

  return (
    <TableRow key={id} className="hover:bg-gray-200/50 hover:cursor-pointer">
      <TableCell
        onClick={() =>
          navigateToTranslation({ projectId, documentId, translationId: id })
        }
        className="pl-1"
      >
        <Container className="flex items-center gap-2">
          <Globe className="h-4 w-4" strokeWidth={1.5} />
          {targetLang}
        </Container>
      </TableCell>
      <TableCell
        onClick={() =>
          navigateToTranslation({ projectId, documentId, translationId: id })
        }
      >
        {fileName}{" "}
      </TableCell>
      <TableCell
        onClick={() =>
          navigateToTranslation({ projectId, documentId, translationId: id })
        }
        className="min-w-36"
      >
        <Container className="flex items-center gap-2">
          <Progress value={progress} className="w-[60%] h-2" />
          <Container as="span" className="text-xs text-muted-foreground">
            {progress}%
          </Container>
        </Container>
      </TableCell>
      <TableCell
        onClick={() =>
          navigateToTranslation({ projectId, documentId, translationId: id })
        }
      >
        <TranslationStatusBadge
          status={status}
          translationStatusConfig={translationStatusConfig}
        />
      </TableCell>
      <TableCell
        onClick={() =>
          navigateToTranslation({ projectId, documentId, translationId: id })
        }
      >
        {new Date(updatedAt).toLocaleDateString()}
      </TableCell>
      <TableCell className="pr-1">
        <TableRowMenu {...rowMenuData} data={data} />
      </TableCell>
    </TableRow>
  );
}
