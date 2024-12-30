import { FileSearch, Languages } from "lucide-react";
import { Button } from "./button";
import Container from "./Container";
import { useEditor } from "@/contexts/editorContext";
import { useQueryClient } from "@tanstack/react-query";
import { TranslationMemoryMatches } from "@/types";
import { usePartialTranslation } from "@/hooks/usePartialTranslation";

export default function EditorControls() {
  const { getActiveSegment } = useEditor();
  const queryClient = useQueryClient();
  const segment = getActiveSegment();
  const allMatches = queryClient.getQueryData<TranslationMemoryMatches>([
    "matches",
  ]);
  const segmentMatches = allMatches?.[segment.id];
  const { mutate } = usePartialTranslation(segment, segmentMatches || null);

  function getTranslation() {
    mutate();
  }

  return (
    <Container className="flex w-full mb-2">
      <Button
        variant="ghost"
        size="icon"
        className="border border-transparent hover:border-cat-accent/10"
        onClick={getTranslation}
      >
        <Languages />
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
