import Preview from "@/components/TextEditor/EditorControls/Preview";
import DataHandler from "@/components/ui/DataHandler";
import { usePreview } from "@/hooks/usePreview";
import { useRoute } from "@/hooks/useRoute";
export default function TranslationPreview() {
  const { translationId } = useRoute();
  const { html, isLoading, error, isError } = usePreview(translationId);

  return (
    <DataHandler
      loading={{ isLoading }}
      error={{ isError, error }}
      empty={{ isEmpty: !html }}
    >
      <Preview html={html || ""} />
    </DataHandler>
  );
}
