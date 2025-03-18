import HtmlViewer from "@/components/ui/DocViewer/HtmlViewer";
import DataHandler from "@/components/ui/DataHandler";
import { usePreview } from "@/hooks/usePreview";
import { useRoute } from "@/hooks/useRoute";
import SkeletonViewer from "@/components/ui/DocViewer/SkeletonViewer";
export default function TranslationPreview() {
  const { translationId } = useRoute();
  const { html, isLoading, error, isError } = usePreview(translationId);

  return (
    <DataHandler
      data={html}
      loading={{ isLoading, component: <SkeletonViewer /> }}
      error={{ isError, error }}
      empty={{ isEmpty: !html }}
    >
      {(html) => <HtmlViewer html={html} />}
    </DataHandler>
  );
}
