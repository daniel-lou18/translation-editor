import CardComponent from "@/components/ui/Card/CardComponent";
import { Document, DocumentWithTranslationsSegments } from "@/types/Document";
import { Button } from "@/components/ui/button";
import { FileText, Edit, Download, Trash } from "lucide-react";
import { formatDate, formatNumber, formatFileSize } from "@/utils/formatters";
import Container from "../Container";

type DocumentCardProps = {
  document: DocumentWithTranslationsSegments;
  fileSize?: number;
  onEdit?: (document: Document) => void;
  onDelete?: (document: Document) => void;
  onDownload?: (document: Document) => void;
};

export default function DocumentCard({
  document,
  fileSize,
  onEdit,
  onDelete,
  onDownload,
}: DocumentCardProps) {
  const {
    fileName,
    sourceLang,
    domain,
    subdomain,
    docType,
    createdAt,
    updatedAt,
    sourceSegments,
    translations,
  } = document;

  // Calculate additional metrics
  const segmentCount = sourceSegments.length;
  const wordCount = sourceSegments.reduce((count, segment) => {
    return count + (segment.sourceText.split(/\s+/).length || 0);
  }, 0);
  const characterCount = sourceSegments.reduce((count, segment) => {
    return count + (segment.sourceText.length || 0);
  }, 0);

  // Calculate translation metrics
  const translationCount = translations.length;
  const translatedLanguages = translations.map((t) => t.targetLang).join(", ");

  // Calculate overall translation progress
  const translationProgress =
    translations.length > 0
      ? translations.reduce((sum, translation) => {
          const translatedSegments = translation.targetSegments.filter(
            (segment) => segment.status === "translated" && segment.targetText
          ).length;
          const progress =
            translatedSegments / translation.targetSegments.length || 0;
          return sum + progress;
        }, 0) / translations.length
      : 0;

  // Find most recent translation activity
  const mostRecentTranslation =
    translations.length > 0
      ? translations.reduce((latest, current) => {
          return new Date(current.updatedAt) > new Date(latest.updatedAt)
            ? current
            : latest;
        }, translations[0])
      : null;

  const mostRecentActivity = mostRecentTranslation
    ? formatDate(mostRecentTranslation.updatedAt)
    : "No translations yet";

  type DetailItem = { label: string; value: string } | null;

  const documentDetails: DetailItem[] = [
    { label: "File Name", value: fileName },
    { label: "Source Language", value: sourceLang },
    { label: "Domain", value: domain || "Not specified" },
    { label: "Subdomain", value: subdomain || "Not specified" },
    { label: "Document Type", value: docType || "Not specified" },
    { label: "Segments", value: formatNumber(segmentCount) },
    { label: "Word Count", value: formatNumber(wordCount) },
    { label: "Character Count", value: formatNumber(characterCount) },
    fileSize ? { label: "File Size", value: formatFileSize(fileSize) } : null,
    { label: "Created", value: formatDate(createdAt) },
    { label: "Last Updated", value: formatDate(updatedAt) },
  ].filter(Boolean);

  const translationDetails: DetailItem[] = [
    { label: "Number of Translations", value: formatNumber(translationCount) },
    translationCount > 0
      ? { label: "Target Languages", value: translatedLanguages }
      : null,
    translationCount > 0
      ? {
          label: "Overall Progress",
          value: `${Math.round(translationProgress * 100)}%`,
        }
      : null,
    translationCount > 0
      ? { label: "Latest Translation Activity", value: mostRecentActivity }
      : null,
  ].filter(Boolean);

  return (
    <CardComponent>
      <CardComponent.Header
        title="Document Details"
        description="Information about this document and its content"
      >
        <FileText className="h-5 w-5 text-muted-foreground" />
      </CardComponent.Header>
      <CardComponent.Content className="p-0 gap-0">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6 py-4">
          {documentDetails.map(
            (detail) =>
              detail && (
                <Container
                  key={detail.label}
                  className="flex flex-col space-y-1"
                >
                  <span className="text-sm font-medium text-muted-foreground">
                    {detail.label}
                  </span>
                  <span className="text-sm">{detail.value}</span>
                </Container>
              )
          )}
        </Container>

        {/* Translation metrics section */}
        {translationDetails.length > 0 && (
          <>
            <Container className="flex flex-col space-y-1 col-span-1 lg:col-span-2 border-t border-sidebar-border px-6 pt-4">
              <span className="text-sm font-semibold">Translation Metrics</span>
            </Container>

            <Container className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6 py-4">
              {translationDetails.map(
                (detail) =>
                  detail && (
                    <Container
                      key={detail.label}
                      className="flex flex-col space-y-1"
                    >
                      <span className="text-sm font-medium text-muted-foreground">
                        {detail.label}
                      </span>
                      <span className="text-sm">{detail.value}</span>
                    </Container>
                  )
              )}
            </Container>
          </>
        )}
      </CardComponent.Content>
      <CardComponent.Footer text="This document contains source text that can be translated into multiple languages.">
        <Container className="flex space-x-2">
          {onEdit && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(document)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
          {onDownload && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDownload(document)}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          )}
          {onDelete && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(document)}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
        </Container>
      </CardComponent.Footer>
    </CardComponent>
  );
}
