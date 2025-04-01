import { FormattedTranslation } from "@/types/Translation";
import TranslationsTableRow from "./TranslationsTableRow";
import { TableCell, TableRow } from "@/components/ui/table";
import { useExportTranslation } from "@/hooks/useExportTranslation";
import { useRoute } from "@/hooks/useRoute";
import { getFileType, getMimeType } from "@/types/Files";

type TranslationsTableBodyProps = {
  translations: FormattedTranslation[];
};

export default function TranslationsTableBody({
  translations,
}: TranslationsTableBodyProps) {
  const { downloadFile } = useExportTranslation();
  const {
    navigateToTranslation,
    navigateToTranslationDetails,
    navigateToTranslationPreview,
    projectId,
  } = useRoute();

  const translationRowMenuData = {
    name: "translation",
    items: [
      {
        value: "Open translation",
        onClick: (translation: FormattedTranslation) => {
          if (!projectId) {
            return;
          }

          navigateToTranslation({
            projectId,
            documentId: translation.documentId,
            translationId: translation.id,
          });
        },
      },
      {
        value: "View translation",
        onClick: (translation: FormattedTranslation) => {
          if (!projectId) {
            return;
          }

          navigateToTranslationPreview({
            documentId: translation.documentId,
            translationId: translation.id,
          });
        },
      },
      {
        value: "View details",
        onClick: (translation: FormattedTranslation) => {
          if (!projectId) {
            return;
          }

          navigateToTranslationDetails({
            documentId: translation.documentId,
            translationId: translation.id,
          });
        },
      },
      {
        value: "Export",
        subItems: [
          {
            value: "Plain text (.txt)",
            onClick: (translation: FormattedTranslation) => {
              downloadFile(
                {
                  input: getMimeType(translation.document.fileName),
                  output: "text/plain",
                },
                String(translation.id)
              );
            },
          },
          {
            value: "HTML (.html)",
            onClick: (translation: FormattedTranslation) => {
              downloadFile(
                {
                  input: getMimeType(translation.document.fileName),
                  output: "text/html",
                },
                String(translation.id)
              );
            },
          },
          {
            value: "PDF (.pdf)",
            onClick: (translation: FormattedTranslation) => {
              downloadFile(
                {
                  input: getMimeType(translation.document.fileName),
                  output: "application/pdf",
                },
                String(translation.id)
              );
            },
          },
          {
            value: "Microsoft Word (.docx)",
            onClick: (translation: FormattedTranslation) => {
              downloadFile(
                {
                  input: getMimeType(translation.document.fileName),
                  output:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                },
                String(translation.id)
              );
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
          rowMenuData={translationRowMenuData}
        />
      ))}
    </>
  );
}
