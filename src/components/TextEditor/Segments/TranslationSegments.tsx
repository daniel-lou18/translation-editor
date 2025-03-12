import { useEditor } from "@/contexts/editorContext";
import { useAutoTranslation } from "@/hooks/useAutoTranslation";
import { useCallback, KeyboardEvent, ChangeEvent } from "react";
import { useSemanticMatches } from "@/hooks/useSemanticMatches";
import { useSegmentHandlers } from "@/hooks/useSegmentHandlers";
import { EditorSegment } from "@/components/ui/Editor/EditorSegment";
import ContentContainer from "@/components/ui/Editor/ContentContainer";
export default function TranslationSegments() {
  const { segments, activeSegmentId, getActiveSegment } = useEditor();
  const activeSegment = getActiveSegment();
  const { matches } = useSemanticMatches(activeSegment);
  const {
    autoTranslation,
    isPending: isLoading,
    isError,
  } = useAutoTranslation(activeSegment, matches);
  const { onChange, onClick, onStatusChange, onKeyDown } = useSegmentHandlers();

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
    <ContentContainer>
      {segments.map((segment, idx) => (
        <EditorSegment
          key={segment.id}
          data={{
            ...segment,
            activeId: activeSegmentId,
            index: idx,
            placeholder: renderAutoTranslation(segment.id),
          }}
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
    </ContentContainer>
  );
}
