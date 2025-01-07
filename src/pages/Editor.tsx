import TextEditor from "@/components/TextEditor";
import DataHandler from "@/components/ui/DataHandler";
import EditorContextProvider from "@/contexts/editorContext";
import { useSegments } from "@/hooks/useSegments";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";

export default function EditorPage() {
  const { projectId, translationId } = useTranslationRoute();
  const { segments, isLoading, isError, error } = useSegments(
    projectId,
    translationId
  );

  return (
    <DataHandler isLoading={isLoading} isError={isError} error={error}>
      {segments?.length ? (
        <EditorContextProvider initialSegments={segments}>
          <TextEditor />
        </EditorContextProvider>
      ) : null}
    </DataHandler>
  );
}
