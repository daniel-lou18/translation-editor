import { useEditor } from "@/contexts/editorContext";
import { TranslationSegment } from "./TranslationSegment";
import { useAutoTranslation } from "@/hooks/useAutoTranslation";
import Container from "../../ui/Container";
import { useCallback } from "react";
import { useSemanticMatches } from "@/hooks/useSemanticMatches";

export default function TranslationSegments() {
  const { segments, activeSegmentId, getActiveSegment } = useEditor();
  const activeSegment = getActiveSegment();
  const { matches } = useSemanticMatches(activeSegment);
  const {
    autoTranslation,
    isPending: isLoading,
    isError,
  } = useAutoTranslation(activeSegment, matches);

  console.log({ matches });

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
