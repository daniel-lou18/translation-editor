import HtmlViewer from "@/components/ui/DocViewer/HtmlViewer";
import { usePreview } from "@/hooks/usePreview";
import { useRoute } from "@/hooks/useRoute";
import NoContent from "@/components/ui/Error/NoFileContent";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { getFileType } from "@/types/Files";
import DocxViewer from "@/components/ui/DocViewer/DocxViewer";
import DocViewerSkeleton from "@/components/ui/DocViewer/DocViewerSkeleton";
import DocViewerError from "@/components/ui/DocViewer/DocViewerError";

export default function TranslationPreview() {
  const { translationId } = useRoute();
  const {
    html,
    isLoading: isLoadingTranslation,
    error: errorTranslation,
    isError: isErrorTranslation,
  } = usePreview(translationId);
  const {
    currentDocument,
    isLoading: isLoadingDocument,
    isError: isErrorDocument,
    error: errorDocument,
  } = useCurrentProject();
  const contentType = getFileType(currentDocument?.fileName);

  if (isLoadingTranslation || isLoadingDocument) return <DocViewerSkeleton />;

  if (isErrorTranslation || isErrorDocument)
    return (
      <DocViewerError
        error={
          errorTranslation?.message ||
          errorDocument?.message ||
          "Error Loading Translation"
        }
      />
    );

  if (!html || !currentDocument) return <NoContent title="No Content Found" />;

  if (contentType === "word") {
    return (
      <DocxViewer
        html={{
          original: currentDocument.html ?? "No content available",
          translation: html,
        }}
      />
    );
  }
  return (
    <HtmlViewer
      html={{
        original: currentDocument.html ?? "No content available",
        translation: html,
      }}
    />
  );
}
