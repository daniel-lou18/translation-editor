import TranslationSegments from "@/components/TextEditor/Segments/TranslationSegments";
import Container from "@/components/ui/Container";
import EditorControls from "@/components/TextEditor/EditorControls/EditorControls";
import ProjectControls from "@/components/TextEditor/ProjectControls";
import SideMenu from "./SideMenu";

export default function TextEditor() {
  return (
    <>
      <Container className="sticky top-0 z-10 bg-gray-50 p-4 space-y-2">
        <ProjectControls />
        <EditorControls />
      </Container>
      <Container className="px-4 grid grid-cols-12 gap-6 relative overflow-visible">
        <TranslationSegments />
        <SideMenu />
      </Container>
    </>
  );
}
