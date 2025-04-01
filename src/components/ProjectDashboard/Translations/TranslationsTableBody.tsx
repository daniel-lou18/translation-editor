import { FormattedTranslation } from "@/types/Translation";
import TranslationsTableRow from "./TranslationsTableRow";
import { TableCell, TableRow } from "@/components/ui/table";
import { useExportTranslation } from "@/hooks/useExportTranslation";
import { useRoute } from "@/hooks/useRoute";
import { getMimeType, MimeType } from "@/types/Files";
import { EXPORT_FORMATS } from "@/config/translationsTable";
import { useCallback } from "react";

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

  const handleDownload = useCallback(
    (translation: FormattedTranslation, output: MimeType) => {
      const input = getMimeType(translation.document.fileName);
      if (!input) {
        return;
      }
      downloadFile(
        {
          input,
          output,
        },
        String(translation.id)
      );
    },
    [downloadFile]
  );

  const navigationItems = [
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
  ];

  const translationRowMenuData = {
    name: "translation",
    items: [
      ...navigationItems,
      {
        value: "Export",
        subItems: Object.entries(EXPORT_FORMATS).map(([_, value]) => ({
          value: value.label,
          onClick: (translation: FormattedTranslation) =>
            handleDownload(translation, value.mimeType),
        })),
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
