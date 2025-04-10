import { useEditor } from "@/contexts/editorContextV1";
import { useAutoTranslation } from "@/hooks/useAutoTranslation";
import { useCallback, KeyboardEvent, ChangeEvent } from "react";
import { useSemanticMatches } from "@/hooks/useSemanticMatches";
import { useSegmentHandlers } from "@/hooks/useSegmentHandlers";
import ContentContainer from "@/components/ui/Editor/ContentContainer";
import { EditorSegment } from "@/components/ui/Editor/EditorSegmentV2";
import { useSaveSegment } from "@/hooks/useSaveSegment";

export default function TranslationSegments() {
  const { segments, activeSegmentId, getActiveSegment } = useEditor();
  const { mutate: saveSegment } = useSaveSegment();
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
            onSave: saveSegment,
          }}
        />
      ))}
    </ContentContainer>
  );
}
