import { useEditor } from "@/contexts/editorContext";
import { TranslationSegment } from "./TranslationSegment";
import { SemanticMatch } from "@/types";
import { useAutoTranslation } from "@/hooks/useAutoTranslation";
import Container from "../../ui/Container";
import { useCallback } from "react";

type TranslationSegmentsProps = {
  matches: SemanticMatch[] | null;
};

export default function TranslationSegments({
  matches,
}: TranslationSegmentsProps) {
  const { segments, activeSegmentId, getActiveSegment } = useEditor();
  const activeSegment = getActiveSegment();
  const {
    data: autoTranslations,
    isPending: isLoading,
    isError,
  } = useAutoTranslation(activeSegment, matches);
  const autoTranslation = autoTranslations?.[activeSegmentId];

  const renderAutoTranslation = useCallback(
    (id: number) => {
      if (activeSegmentId !== id) return null;
      if (isLoading) return "Loading translation...";
      if (isError) return "Could not get auto-translation";
      return autoTranslation || null;
    },
    [activeSegmentId, autoTranslation, isLoading, isError]
  );

  return (
    <Container className="col-span-9 rounded-xl border border-gray-100 bg-white shadow-sm divide-y divide-gray-100">
      {segments.map((segment, idx) => (
        <TranslationSegment
          key={segment.id}
          data={segment}
          autoTranslation={renderAutoTranslation(segment.id)}
          activeId={activeSegmentId}
          index={idx}
        />
      ))}
    </Container>
  );
}
