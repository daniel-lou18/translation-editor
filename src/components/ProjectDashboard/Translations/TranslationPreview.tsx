import HtmlViewer from "@/components/ui/DocViewer/HtmlViewer";
import { usePreview } from "@/hooks/usePreview";
import { useRoute } from "@/hooks/useRoute";
import SkeletonViewer from "@/components/ui/DocViewer/SkeletonViewer";
import Error from "@/components/ui/Error/FileError";
import NoContent from "@/components/ui/Error/NoFileContent";

export default function TranslationPreview() {
  const { translationId } = useRoute();
  const { html, isLoading, error, isError } = usePreview(translationId);

  if (isLoading) return <SkeletonViewer />;

  if (isError) return <Error title="Error Loading Translation" error={error} />;

  if (!html) return <NoContent title="No Translation Found" />;

  return <HtmlViewer html={html} />;
}
