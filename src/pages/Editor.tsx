import TextEditor from "@/components/TextEditor";
import DataHandler from "@/components/ui/DataHandler";
import EditorContextProvider from "@/contexts/editorContext";
import { useGetSegments } from "@/hooks/useGetSegments";

export default function EditorPage() {
  const { segments, isLoading, isError, error } = useGetSegments();

  return (
    <DataHandler isLoading={isLoading} isError={isError} error={error}>
      {segments?.length ? (
        <EditorContextProvider
          initialSegments={segments}
          key={segments?.[0].id}
        >
          <TextEditor />
        </EditorContextProvider>
      ) : null}
    </DataHandler>
  );
}
