import TextEditor from "@/components/TextEditor";
import TextEditorSkeleton from "@/components/TextEditor/TextEditorSkeleton";
import Error from "@/components/ui/Error/FileError";
import NoContent from "@/components/ui/Error/NoFileContent";
import EditorContextProvider from "@/contexts/editorContext";
import ResourcesContextProvider from "@/contexts/resourcesContext";
import { useGetTranslationSegments } from "@/hooks/useGetTranslationSegments";

export default function EditorPage() {
  const { segments, isLoading, isError, error } = useGetTranslationSegments();

  if (isLoading) return <TextEditorSkeleton />;
  if (isError) return <Error title="Error Loading Editor" error={error} />;
  if (!segments || segments.length === 0)
    return (
      <NoContent
        title="No Segments Found"
        description="There are no segments available for this translation. Please select a different document or create a new translation."
      />
    );

  return (
    <EditorContextProvider initialSegments={segments} key={segments?.[0]?.id}>
      <ResourcesContextProvider>
        <TextEditor />
      </ResourcesContextProvider>
    </EditorContextProvider>
  );
}
