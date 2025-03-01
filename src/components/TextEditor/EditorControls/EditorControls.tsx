import {
  BookOpenText,
  CaseSensitive,
  CircleXIcon,
  ClipboardPaste,
  CornerRightDown,
  Download,
  Eye,
  FileCheck,
  FileSearch,
  Lock,
  SquareCheckBig,
  SquareM,
  WandSparkles,
} from "lucide-react";
import { Button } from "../../ui/button";
import Container from "@/components/ui/Container";
import { useEditor } from "@/contexts/editorContext";
import { useReformulate } from "@/hooks/useReformulate";
import { useQueryClient } from "@tanstack/react-query";
import { TranslationMemoryMatches } from "@/types";
import { useExportTranslation } from "@/hooks/useExportTranslation";
import SearchForm from "@/components/ui/SearchForm";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useResources } from "@/contexts/resourcesContext";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Preview from "./Preview";
import { usePreview } from "@/hooks/usePreview";

export default function EditorControls() {
  const {
    activeSegmentId,
    getActiveSegment,
    handleStatusChange,
    handleStatusChangeAll,
  } = useEditor();
  const segment = getActiveSegment();
  const queryClient = useQueryClient();
  const matches = queryClient.getQueryData<TranslationMemoryMatches>([
    "allMatches",
  ]);
  const currentMatches = matches?.[activeSegmentId]?.matches;
  const targetTexts = currentMatches
    ? currentMatches.map((match) => match.targetText)
    : [];

  const { mutate } = useReformulate(activeSegmentId);

  const { downloadFile } = useExportTranslation();
  const { currentView, changeView } = useResources();
  const { html, isLoading: isLoadingPreview } = usePreview();

  function handleReformulate() {
    if (!segment.targetText) return;
    mutate({
      translatedText: segment.targetText,
      examples: targetTexts,
      targetLang: segment.targetLang,
    });
  }

  return (
    <>
      <Container className="sticky top-[49px] z-10 col-span-9 px-2 py-1 border-b border-border bg-gray-50">
        <Button
          variant="ghost"
          size="icon"
          className="border border-transparent hover:border-cat-accent/10"
          onClick={() => handleStatusChange(activeSegmentId)}
        >
          <SquareCheckBig />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="border border-transparent hover:border-cat-accent/10"
          onClick={handleStatusChangeAll}
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
          <CornerRightDown />
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
          onClick={() => undefined}
        >
          <CaseSensitive />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="border border-transparent hover:border-cat-accent/10"
          onClick={handleReformulate}
        >
          <WandSparkles />
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="border border-transparent hover:border-cat-accent/10"
            >
              <Eye />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw]">
            <Preview html={isLoadingPreview ? "LOADING..." : html ?? "error"} />
          </DialogContent>
        </Dialog>
        <Button
          variant="ghost"
          size="icon"
          className="border border-transparent hover:border-cat-accent/10"
          onClick={downloadFile}
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
        <ToggleGroup
          type="single"
          value={currentView}
          onValueChange={changeView}
        >
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
