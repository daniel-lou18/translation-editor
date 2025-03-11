import {
  BookOpenText,
  Bot,
  CaseSensitive,
  CircleXIcon,
  ClipboardPaste,
  CornerRightDown,
  Download,
  Eye,
  FileCheck,
  FileSearch,
  FileText,
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
import { useImprove } from "@/hooks/useImprove";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import EditorbarContainer from "@/components/ui/Editor/EditorbarContainer";
import TmbarContainer from "@/components/ui/Editor/TmbarContainer";

export default function EditorControls() {
  const {
    activeSegmentId,
    getActiveSegment,
    handleStatusChange,
    handleStatusChangeAll,
  } = useEditor();
  const segment = getActiveSegment();
  const { currentDocument } = useCurrentProject();
  const queryClient = useQueryClient();
  const matches = queryClient.getQueryData<TranslationMemoryMatches>([
    "allMatches",
  ]);
  const currentMatches = matches?.[activeSegmentId]?.matches;
  const targetTexts = currentMatches
    ? currentMatches.map((match) => match.targetText)
    : [];

  const { mutate } = useReformulate(activeSegmentId);
  const { mutate: mutateImprove } = useImprove(activeSegmentId);

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

  function handleImprove() {
    if (!segment.targetText || !currentDocument?.domain) return;
    mutateImprove({
      segment: {
        sourceText: segment.sourceText,
        targetText: segment.targetText,
      },
      metadata: {
        sourceLang: segment.sourceLang,
        targetLang: segment.targetLang,
        domain: currentDocument.domain,
      },
    });
  }

  return (
    <>
      <EditorbarContainer>
        <Container className="inline-flex items-center rounded-md border border-border p-0.5 mr-2 bg-background">
          <Button
            variant="ghost"
            className="h-8 w-8"
            onClick={() => handleStatusChange(activeSegmentId)}
          >
            <SquareCheckBig />
          </Button>
          <Button
            variant="ghost"
            className="h-8 w-8"
            onClick={handleStatusChangeAll}
          >
            <FileCheck />
          </Button>
          <Button variant="ghost" className="h-8 w-8" onClick={() => undefined}>
            <Lock />
          </Button>
        </Container>
        <Container className="inline-flex items-center rounded-md border border-border p-0.5 mr-2 bg-background">
          <Button variant="ghost" className="h-8 w-8" onClick={() => undefined}>
            <CornerRightDown />
          </Button>
          <Button variant="ghost" className="h-8 w-8" onClick={() => undefined}>
            <ClipboardPaste />
          </Button>
          <Button variant="ghost" className="h-8 w-8" onClick={() => undefined}>
            <CircleXIcon />
          </Button>
          <Button variant="ghost" className="h-8 w-8" onClick={() => undefined}>
            <CaseSensitive />
          </Button>
        </Container>

        <Container className="inline-flex items-center rounded-md border border-border p-0.5 mr-2 bg-background">
          <Button
            variant="ghost"
            className="h-8 w-8"
            onClick={handleReformulate}
          >
            <WandSparkles />
          </Button>
          <Button variant="ghost" className="h-8 w-8" onClick={handleImprove}>
            <Bot />
          </Button>
        </Container>
        <Container className="inline-flex items-center rounded-md border border-border p-0.5 mr-2 bg-background">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="h-8 w-8">
                <Eye />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw]">
              <Preview
                html={isLoadingPreview ? "LOADING..." : html ?? "error"}
              />
            </DialogContent>
          </Dialog>
          <Button
            variant="ghost"
            className="h-8 w-8"
            onClick={() => downloadFile("txt")}
          >
            <Download />
          </Button>
          <Button
            variant="ghost"
            className="h-8 w-8"
            onClick={() => downloadFile("pdf")}
          >
            <FileText />
          </Button>
          <Button variant="ghost" className="h-8 w-8">
            <FileSearch />
          </Button>
        </Container>
      </EditorbarContainer>
      <TmbarContainer>
        <SearchForm
          placeholder="Search glossary"
          className="h-8 border-border"
        />
        <ToggleGroup
          type="single"
          value={currentView}
          onValueChange={changeView}
        >
          <ToggleGroupItem
            value="tm"
            className="h-8 data-[state=on]:bg-cat-accent/10"
          >
            <SquareM />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="glossary"
            className="h-8 data-[state=on]:bg-cat-accent/10"
          >
            <BookOpenText />
          </ToggleGroupItem>
        </ToggleGroup>
      </TmbarContainer>
    </>
  );
}
