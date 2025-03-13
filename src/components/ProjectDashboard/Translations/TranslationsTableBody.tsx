import { FormattedTranslation } from "@/types/Translation";
import TranslationsTableRow from "./TranslationsTableRow";
import { TableCell, TableRow } from "@/components/ui/table";
import { useExportTranslation } from "@/hooks/useExportTranslation";

type TranslationsTableBodyProps = {
  translations: FormattedTranslation[];
  onClick: (documentId: number, translationId: number) => void;
};

export default function TranslationsTableBody({
  translations,
  onClick,
}: TranslationsTableBodyProps) {
  const { downloadFile } = useExportTranslation();

  const translationRowMenuData = {
    name: "translation",
    items: [
      {
        value: "Open translation",
        onClick: (translation: FormattedTranslation) => {
          onClick(translation.documentId, translation.id);
        },
      },
      {
        value: "View details",
        onClick: () => {},
      },
      {
        value: "Export",
        subItems: [
          {
            value: "Plain text (.txt)",
            onClick: (translation: FormattedTranslation) => {
              downloadFile("txt", String(translation.id));
            },
          },
          {
            value: "HTML (.html)",
            onClick: (translation: FormattedTranslation) => {
              downloadFile("txt", String(translation.id));
            },
          },
          {
            value: "PDF (.pdf)",
            onClick: (translation: FormattedTranslation) => {
              downloadFile("pdf", String(translation.id));
            },
          },
          {
            value: "Microsoft Word (.docx)",
            onClick: (translation: FormattedTranslation) => {
              downloadFile("txt", String(translation.id));
            },
          },
        ],
      },
      {
        value: "Delete",
        onClick: () => {},
      },
    ],
  };

  if (translations.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="h-24 text-center">
          No translations found
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {translations.map((translation) => (
        <TranslationsTableRow
          key={translation.id}
          data={translation}
          onClick={onClick}
          rowMenuData={translationRowMenuData}
        />
      ))}
    </>
  );
}
