import TextEditor from "@/components/TextEditor";
import TextEditorSkeleton from "@/components/TextEditor/TextEditorSkeleton";
import DataHandler from "@/components/ui/DataHandler";
import EditorContextProvider from "@/contexts/editorContext";
import ResourcesContextProvider from "@/contexts/resourcesContext";
import { useGetTranslationSegments } from "@/hooks/useGetTranslationSegments";

export default function EditorPage() {
  const { segments, isLoading, isError, error } = useGetTranslationSegments();

  return (
    <DataHandler
      isLoading={isLoading}
      isError={isError}
      error={error}
      loadingComponent={<TextEditorSkeleton />}
    >
      <EditorContextProvider initialSegments={segments} key={segments?.[0].id}>
        <ResourcesContextProvider>
          <TextEditor />
        </ResourcesContextProvider>
      </EditorContextProvider>
    </DataHandler>
  );
}
