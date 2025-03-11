import { useEditor } from "@/contexts/editorContext";
import { TranslationSegment } from "./TranslationSegment";
import { useAutoTranslation } from "@/hooks/useAutoTranslation";
import Container from "../../ui/Container";
import { useCallback, KeyboardEvent, ChangeEvent } from "react";
import { useSemanticMatches } from "@/hooks/useSemanticMatches";
import { useSegmentHandlers } from "@/hooks/useSegmentHandlers";

export default function TranslationSegments() {
  const { segments, activeSegmentId, getActiveSegment, handleValueChange } =
    useEditor();
  const activeSegment = getActiveSegment();
  const { matches } = useSemanticMatches(activeSegment);
  const {
    autoTranslation,
    isPending: isLoading,
    isError,
  } = useAutoTranslation(activeSegment, matches);
  const { onChange, onClick, onStatusChange, onKeyDown } = useSegmentHandlers();

  console.log({ activeSegment });

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
    <Container className="col-span-9 bg-background shadow-sm divide-y divide-gray-100 border-r border-muted">
      {segments.map((segment, idx) => (
        <TranslationSegment
          key={segment.id}
          data={segment}
          autoTranslation={renderAutoTranslation(segment.id)}
          activeId={activeSegmentId}
          index={idx}
          handlers={{
            onChange: (e: ChangeEvent<HTMLTextAreaElement>) =>
              onChange(e, segment.id),
            onClick: () => onClick(segment.id),
            onStatusChange: () => onStatusChange(segment.id),
            onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) =>
              onKeyDown(e, segment.id, autoTranslation ?? null),
          }}
        />
      ))}
    </Container>
  );
}
