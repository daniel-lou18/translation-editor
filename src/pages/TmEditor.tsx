import TmEditor from "@/components/TmEditor";
import ResourcesContextProvider from "@/contexts/resourcesContext";
export default function TmEditorPage() {
  return (
    <ResourcesContextProvider>
      <TmEditor />
    </ResourcesContextProvider>
  );
}
