import {
  FileCheck,
  FileSearch,
  SquareCheckBig,
  WandSparkles,
} from "lucide-react";
import { Button } from "./button";
import Container from "./Container";
import { useEditor } from "@/contexts/editorContext";
import { useReformulate } from "@/hooks/useReformulate";
import { useQueryClient } from "@tanstack/react-query";
import { TranslationMemoryMatches } from "@/types";

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

  const { mutate } = useReformulate(
    activeSegmentId,
    segment.target,
    targetTexts
  );

  return (
    <Container className="flex w-full mb-2">
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
        onClick={() => mutate()}
      >
        <WandSparkles />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="border border-transparent hover:border-cat-accent/10"
      >
        <FileSearch />
      </Button>
    </Container>
  );
}
