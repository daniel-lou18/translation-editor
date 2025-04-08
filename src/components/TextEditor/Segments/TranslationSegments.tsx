import { useEditor } from "@/contexts/editorContext";
// import { useAutoTranslation } from "@/hooks/useAutoTranslation";
import {
  KeyboardEvent,
  ChangeEvent,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
// import { useSemanticMatches } from "@/hooks/useSemanticMatches";
import { EditorSegment } from "@/components/ui/Editor/EditorSegment";
import ContentContainer from "@/components/ui/Editor/ContentContainer";
import { useGetTranslationSegments } from "@/hooks/useGetTranslationSegments";
import { useSaveSegments } from "@/hooks/useSaveSegments";
import { createDebouncedFunction } from "@/utils/helpers";

export default function TranslationSegments() {
  const { activeSegmentId, setActiveId } = useEditor();
  const { mutate: saveSegments } = useSaveSegments();
  const { segments } = useGetTranslationSegments();
  const activeSegment =
    segments.find((segment) => segment.sourceSegmentId === activeSegmentId) ??
    null;
  const [localChanges, setLocalChanges] = useState<Record<number, string>>({});

  console.log(activeSegmentId);

  const debouncedSaveSegmentsRef = useRef(
    createDebouncedFunction(
      (sourceSegmentId: number, targetText: string) =>
        saveSegments({ sourceSegmentId, targetText }),
      750
    )
  );

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!activeSegment || !debouncedSaveSegmentsRef.current) return;
    setLocalChanges((prevState) => ({
      ...prevState,
      [activeSegment.sourceSegmentId]: e.target.value,
    }));
    debouncedSaveSegmentsRef.current(
      activeSegment.sourceSegmentId,
      e.target.value
    );
  };

  useEffect(() => {
    return () => {
      debouncedSaveSegmentsRef.current?.cancel();
    };
  }, [debouncedSaveSegmentsRef]);

  // const { matches } = useSemanticMatches(activeSegment);
  // const {
  //   autoTranslation,
  //   isPending: isLoading,
  //   isError,
  // } = useAutoTranslation(activeSegment, matches);
  // const { onChange, onClick, onStatusChange, onKeyDown } = useSegmentHandlers();

  // const renderAutoTranslation = useCallback(
  //   (id: number) => {
  //     if (activeSegmentId !== id) return null;
  //     if (isLoading) return "Loading translation...";
  //     if (isError) return "Could not get auto-translation";
  //     return autoTranslation || null;
  //   },
  //   [activeSegmentId, autoTranslation, isLoading, isError]
  // );

  return (
    <ContentContainer>
      {segments.map((segment, idx) => (
        <EditorSegment
          key={segment.id}
          data={{
            ...segment,
            targetText:
              localChanges[segment.sourceSegmentId] ?? segment.targetText,
            activeId: activeSegmentId,
            index: idx,
            // placeholder: renderAutoTranslation(segment.id),
          }}
          handlers={{
            onChange: handleChange,
            onClick: () => setActiveId(segment.sourceSegmentId),
            // onStatusChange: () => onStatusChange(segment.id),
            // onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) =>
            //   onKeyDown(e, segment.id, autoTranslation ?? null),
          }}
        />
      ))}
    </ContentContainer>
  );
}
