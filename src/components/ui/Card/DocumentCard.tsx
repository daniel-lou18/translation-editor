import CardComponent from "@/components/ui/Card/CardComponent";
import { DocumentWithTranslationsSegments } from "@/types/Document";
import { FileText } from "lucide-react";
import { formatDate, formatNumber, formatFileSize } from "@/utils/formatters";
import Container from "../Container";

type DocumentCardProps = {
  document: DocumentWithTranslationsSegments | null;
};

export default function DocumentCard({ document }: DocumentCardProps) {
  if (!document) {
    return null;
  }

  const {
    fileName = "Untitled",
    sourceLang = "Unknown",
    domain,
    subdomain,
    docType,
    createdAt,
    updatedAt,
    sourceSegments = [],
    translations = [],
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
        title={`${fileName.split(".").slice(0, -1).join(".")}`}
        description="Information and key metrics about this document and its content"
      >
        <FileText className="h-5 w-5 text-muted-foreground" />
      </CardComponent.Header>
      <CardComponent.Content className="p-0 gap-0">
        <Container className="flex flex-col space-y-1 col-span-1 lg:col-span-2 px-6 pt-4 font-semibold">
          Document Metrics
        </Container>
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
            <Container className="flex flex-col space-y-1 col-span-1 lg:col-span-2 border-t border-sidebar-border px-6 pt-4 font-semibold">
              Translation Metrics
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
      <CardComponent.Footer text="This document contains source text that can be translated into multiple languages." />
    </CardComponent>
  );
}
