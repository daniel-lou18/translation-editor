import {
  Download,
  FileCheck,
  FileSearch,
  SquareCheckBig,
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

  function handleReformulate() {
    if (!segment.targetText) return;
    mutate({
      translatedText: segment.targetText,
      examples: targetTexts,
      targetLang: segment.targetLang,
    });
  }

  return (
    <Container className="col-span-12 grid grid-cols-12 flex justify-between items-center px-2 py-1 border-b border-border">
      <Container className="col-span-9">
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
          onClick={handleReformulate}
        >
          <WandSparkles />
        </Button>
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
      <SearchForm placeholder="Search document" className="h-8" />
    </Container>
  );
}
