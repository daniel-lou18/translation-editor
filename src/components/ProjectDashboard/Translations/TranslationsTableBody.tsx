import { FormattedTranslation } from "@/types/Translation";
import TranslationsTableRow from "./TranslationsTableRow";
import { TableCell, TableRow } from "@/components/ui/table";
import { useExportTranslation } from "@/hooks/useExportTranslation";
import { NavigationParams, useRoute } from "@/hooks/useRoute";
import { EXPORT_FORMATS } from "@/config/translationsTable";

const navigate =
  (navigateToTranslation: (params: NavigationParams) => void) =>
  (translation: FormattedTranslation) =>
    navigateToTranslation({
      projectId: translation.document.projectId,
      documentId: translation.documentId,
      translationId: translation.id,
    });

type TranslationsTableBodyProps = {
  translations: FormattedTranslation[];
};

export default function TranslationsTableBody({
  translations,
}: TranslationsTableBodyProps) {
  const { handleDownload } = useExportTranslation();
  const {
    navigateToTranslation,
    navigateToTranslationDetails,
    navigateToTranslationPreview,
  } = useRoute();

  const navigationItems = [
    {
      value: "Open translation",
      onClick: navigate(navigateToTranslation),
    },
    {
      value: "View translation",
      onClick: navigate(navigateToTranslationPreview),
    },
    {
      value: "View details",
      onClick: navigate(navigateToTranslationDetails),
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
