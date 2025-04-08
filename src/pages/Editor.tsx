import TextEditor from "@/components/TextEditor";
import EditorContextProvider from "@/contexts/editorContext";
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
