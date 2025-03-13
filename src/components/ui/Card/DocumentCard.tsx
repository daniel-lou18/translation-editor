import CardComponent from "@/components/ui/Card/CardComponent";
import { Document, DocumentWithSourceSegments } from "@/types/Document";
import { Button } from "@/components/ui/button";
import { FileText, Edit, Download, Trash } from "lucide-react";
import { formatDate, formatNumber, formatFileSize } from "@/utils/formatters";

type DocumentCardProps = {
  document: DocumentWithSourceSegments;
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
  } = document;

  // Calculate additional metrics
  const segmentCount = sourceSegments.length;
  const wordCount = sourceSegments.reduce((count, segment) => {
    return count + (segment.sourceText.split(/\s+/).length || 0);
  }, 0);
  const characterCount = sourceSegments.reduce((count, segment) => {
    return count + (segment.sourceText.length || 0);
  }, 0);

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

  return (
    <CardComponent>
      <CardComponent.Header
        title="Document Details"
        description="Information about this document and its content"
      >
        <FileText className="h-5 w-5 text-muted-foreground" />
      </CardComponent.Header>
      <CardComponent.Content className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documentDetails.map(
          (detail) =>
            detail && (
              <div key={detail.label} className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-muted-foreground">
                  {detail.label}
                </span>
                <span className="text-sm">{detail.value}</span>
              </div>
            )
        )}
      </CardComponent.Content>
      <CardComponent.Footer text="This document contains source text that can be translated into multiple languages.">
        <div className="flex space-x-2">
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
        </div>
      </CardComponent.Footer>
    </CardComponent>
  );
}
