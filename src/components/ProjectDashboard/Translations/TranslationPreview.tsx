import HtmlViewer from "@/components/ui/DocViewer/HtmlViewer";
import { usePreview } from "@/hooks/usePreview";
import { useRoute } from "@/hooks/useRoute";
import SkeletonViewer from "@/components/ui/DocViewer/SkeletonViewer";
import Error from "@/components/ui/Error/FileError";
import NoContent from "@/components/ui/Error/NoFileContent";
import { useCurrentProject } from "@/hooks/useCurrentProject";

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

  if (isLoadingTranslation || isLoadingDocument) return <SkeletonViewer />;

  if (isErrorTranslation || isErrorDocument)
    return (
      <Error
        title="Error Loading Translation"
        error={errorTranslation || errorDocument}
      />
    );

  if (!html || !currentDocument) return <NoContent title="No Content Found" />;

  return (
    <HtmlViewer
      html={{
        original: currentDocument.html ?? "No content available",
        translation: html,
      }}
    />
  );
}
