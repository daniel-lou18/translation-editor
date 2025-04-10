import TextEditor from "@/components/TextEditor";
import EditorContextProvider from "@/contexts/editorContextV1";
import ResourcesContextProvider from "@/contexts/resourcesContext";

export default function EditorPage() {
  return (
    <EditorContextProvider>
      <ResourcesContextProvider>
        <TextEditor />
      </ResourcesContextProvider>
    </EditorContextProvider>
  );
}
