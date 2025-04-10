import TranslationSegments from "@/components/TextEditor/Segments/TranslationSegmentsV1";
import Container from "@/components/ui/Container";
import EditorControls from "@/components/TextEditor/EditorControls/EditorControls";
import ProjectControls from "@/components/TextEditor/ProjectControls";
import SideMenu from "./SideMenu";
import { useEditor } from "@/contexts/editorContextV1";
import NoContent from "../ui/Error/NoFileContent";
import TextEditorSkeleton from "./TextEditorSkeleton";
import Error from "../ui/Error/FileError";
// import SearchForm from "../ui/SearchForm";

export default function TextEditor() {
  const { segments, isError, error, isLoading } = useEditor();

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
    <>
      <Container className="grid grid-cols-12 border-b border-border">
        <ProjectControls />
        <EditorControls />
        {/* <SearchForm placeholder="Search resources" className="col-span-3" /> */}
        <TranslationSegments />
        <SideMenu />
      </Container>
    </>
  );
}
