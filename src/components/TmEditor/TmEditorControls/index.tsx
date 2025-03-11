import {
  BookOpenText,
  CircleXIcon,
  ClipboardPaste,
  Download,
  FileCheck,
  FileSearch,
  Lock,
  SquareCheckBig,
  SquareM,
} from "lucide-react";
import { Button } from "../../ui/button";
import Container from "@/components/ui/Container";
import { useExportTranslation } from "@/hooks/useExportTranslation";
import SearchForm from "@/components/ui/SearchForm";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function TmEditorControls() {
  // const {
  //   activeSegmentId,
  //   handleStatusChange,
  //   handleStatusChangeAll,
  // } = useEditor();

  const { downloadFile } = useExportTranslation();
  // const { currentView, changeView } = useResources();

  return (
    <>
      <Container className="sticky top-[49px] z-10 col-span-9 px-2 py-1 border-b border-border bg-gray-50">
        <Button
          variant="ghost"
          size="icon"
          className="border border-transparent hover:border-cat-accent/10"
          // onClick={() => handleStatusChange(activeSegmentId)}
        >
          <SquareCheckBig />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="border border-transparent hover:border-cat-accent/10"
          // onClick={handleStatusChangeAll}
        >
          <FileCheck />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="border border-transparent hover:border-cat-accent/10"
          onClick={() => undefined}
        >
          <Lock />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="border border-transparent hover:border-cat-accent/10"
          onClick={() => undefined}
        >
          <ClipboardPaste />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="border border-transparent hover:border-cat-accent/10"
          onClick={() => undefined}
        >
          <CircleXIcon />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="border border-transparent hover:border-cat-accent/10"
          onClick={() => downloadFile("txt")}
        >
          <Download />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="border border-transparent hover:border-cat-accent/10"
        >
          <FileSearch />
        </Button>
      </Container>
      <Container className="sticky top-[49px] z-10 col-span-3 flex justify-between items-center px-4 border-b border-border bg-gray-50">
        <SearchForm placeholder="Search glossary" className="h-8" />
        <ToggleGroup type="single" value={"tm"} onValueChange={() => undefined}>
          <ToggleGroupItem
            value="tm"
            className="data-[state=on]:bg-cat-accent/10"
          >
            <SquareM />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="glossary"
            className="data-[state=on]:bg-cat-accent/10"
          >
            <BookOpenText />
          </ToggleGroupItem>
        </ToggleGroup>
      </Container>
    </>
  );
}
