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
import EditorbarContainer from "@/components/ui/Editor/EditorbarContainer";
import TmbarContainer from "@/components/ui/Editor/TmbarContainer";
import IconsContainer from "@/components/ui/Editor/IconsContainer";
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
      <EditorbarContainer>
        <IconsContainer>
          <Button
            variant="ghost"
            className="h-8 w-8"
            // onClick={() => handleStatusChange(activeSegmentId)}
          >
            <SquareCheckBig />
          </Button>
          <Button
            variant="ghost"
            className="h-8 w-8"
            // onClick={handleStatusChangeAll}
          >
            <FileCheck />
          </Button>
          <Button variant="ghost" className="h-8 w-8" onClick={() => undefined}>
            <Lock />
          </Button>
        </IconsContainer>
        <IconsContainer>
          <Button variant="ghost" className="h-8 w-8" onClick={() => undefined}>
            <ClipboardPaste />
          </Button>
          <Button variant="ghost" className="h-8 w-8" onClick={() => undefined}>
            <CircleXIcon />
          </Button>
        </IconsContainer>

        <IconsContainer>
          <Button
            variant="ghost"
            className="h-8 w-8"
            onClick={() => downloadFile("txt")}
          >
            <Download />
          </Button>
          <Button variant="ghost" className="h-8 w-8">
            <FileSearch />
          </Button>
        </IconsContainer>
      </EditorbarContainer>
      <TmbarContainer>
        <SearchForm placeholder="Search glossary" className="h-8" />
        <ToggleGroup
          type="single"
          value={"tm"}
          onValueChange={() => undefined}
          className="rounded-md border border-border p-0.5 mr-2"
        >
          <ToggleGroupItem
            value="tm"
            className="h-8 w-8 data-[state=on]:bg-cat-accent/10"
          >
            <SquareM />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="glossary"
            className="h-8 w-8 data-[state=on]:bg-cat-accent/10"
          >
            <BookOpenText />
          </ToggleGroupItem>
        </ToggleGroup>
      </TmbarContainer>
    </>
  );
}
