import TranslationSegments from "@/components/TextEditor/Segments/TranslationSegments";
import Container from "@/components/ui/Container";
import EditorControls from "@/components/TextEditor/EditorControls/EditorControls";
import ProjectControls from "@/components/TextEditor/ProjectControls";
import SideMenu from "./SideMenu";
// import SearchForm from "../ui/SearchForm";

export default function TextEditor() {
  return (
    <>
      <Container className="sticky top-0 z-10 grid grid-cols-12 bg-gray-50 border-b border-border">
        <ProjectControls />
        <EditorControls />
        {/* <SearchForm placeholder="Search resources" className="col-span-3" /> */}

        <TranslationSegments />
        <SideMenu />
      </Container>
    </>
  );
}
