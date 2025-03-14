import TextEditor from "@/components/TextEditor";
import TextEditorSkeleton from "@/components/TextEditor/TextEditorSkeleton";
import DataHandler from "@/components/ui/DataHandler";
import EditorContextProvider from "@/contexts/editorContext";
import ResourcesContextProvider from "@/contexts/resourcesContext";
import { useGetTranslationSegments } from "@/hooks/useGetTranslationSegments";
import { FileText } from "lucide-react";

export default function EditorPage() {
  const { segments, isLoading, isError, error } = useGetTranslationSegments();

  return (
    <DataHandler
      loading={{
        isLoading,
        component: <TextEditorSkeleton />,
      }}
      error={{
        isError,
        error,
      }}
      empty={{
        isEmpty: !segments || segments.length === 0,
        component: <NoSegmentsFound />,
      }}
    >
      <EditorContextProvider initialSegments={segments} key={segments?.[0]?.id}>
        <ResourcesContextProvider>
          <TextEditor />
        </ResourcesContextProvider>
      </EditorContextProvider>
    </DataHandler>
  );
}

function NoSegmentsFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-8 text-center">
      <FileText className="h-16 w-16 text-muted-foreground mb-4" />
      <h2 className="text-xl font-medium">No Segments Found</h2>
      <p className="text-muted-foreground mt-2 max-w-md">
        There are no segments available for this translation. Please select a
        different document or create a new translation.
      </p>
    </div>
  );
}
