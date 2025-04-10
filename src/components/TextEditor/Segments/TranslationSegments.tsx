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
import { SegmentUpdate } from "@/types/Dtos";
import { Segment } from "@/types/Segment";
import { SegmentStatus } from "@/types";
import { useSemanticMatches } from "@/hooks/useSemanticMatches";
import { useSegmentHandlers } from "@/hooks/useSegmentHandlers";
import { useAutoTranslation } from "@/hooks/useAutoTranslation";

function toggleStatus(status: SegmentStatus | null | undefined): SegmentStatus {
  if (status === "untranslated" || status === undefined || status === null) {
    return "translated";
  }
  return "untranslated";
}

export default function TranslationSegments() {
  const { activeSegmentId, setActiveId } = useEditor();
  const { mutate: saveSegments } = useSaveSegments();
  const { segments } = useGetTranslationSegments();
  const activeSegment =
    segments.find((segment) => segment.sourceSegmentId === activeSegmentId) ??
    null;

  const [localChanges, setLocalChanges] = useState<
    Record<number, SegmentUpdate>
  >({});
  // Ref to keep track of the latest localChanges for the debounced function
  const localChangesRef = useRef(localChanges);

  // Update the ref whenever localChanges state changes
  useEffect(() => {
    localChangesRef.current = localChanges;
  }, [localChanges]);

  const debouncedSaveRef = useRef(
    createDebouncedFunction(() => {
      const updatesToSave = Object.values(localChangesRef.current);
      if (updatesToSave.length > 0) {
        saveSegments(updatesToSave);
      }
    }, 750)
  );

  const handleTextChange = (value: string, sourceSegmentId: number) => {
    setLocalChanges((prevState) => ({
      ...prevState,
      [sourceSegmentId]: {
        ...prevState[sourceSegmentId],
        sourceSegmentId: sourceSegmentId,
        targetText: value,
      },
    }));
    debouncedSaveRef.current();
  };

  const handleStatusChange = (segment: Segment, newStatus?: SegmentStatus) => {
    setLocalChanges((prevState) => {
      const currentLocal = prevState[segment.sourceSegmentId];
      let statusToSet: SegmentStatus;

      if (newStatus) {
        statusToSet = newStatus;
      } else {
        const statusToToggle = currentLocal?.status ?? segment.status;
        statusToSet = toggleStatus(statusToToggle);
      }

      return {
        ...prevState,
        [segment.sourceSegmentId]: {
          ...currentLocal,
          sourceSegmentId: segment.sourceSegmentId,
          status: statusToSet,
          targetText: currentLocal?.targetText ?? segment.targetText,
        },
      };
    });
    debouncedSaveRef.current();
  };

  useEffect(() => {
    return () => {
      debouncedSaveRef.current?.cancel();
    };
  }, []);

  const { matches } = useSemanticMatches(activeSegment);
  const {
    autoTranslation,
    isPending: isLoading,
    isError,
  } = useAutoTranslation(activeSegment, matches);

  const onKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>,
    segment: Segment,
    autoTranslation: string | null
  ) => {
    if (e.key === "Tab") {
      e.preventDefault();
      onTab(segment.sourceSegmentId, autoTranslation);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      onEnter(segment);
    }
  };

  const onTab = (segmentId: number, autoTranslation: string | null) => {
    if (!autoTranslation) return;
    handleTextChange(autoTranslation, segmentId);
  };

  const onEnter = (segment: Segment) => {
    handleStatusChange(segment, "translated");
    // toNextSegment();
  };

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
            targetText:
              localChanges[segment.sourceSegmentId]?.targetText ??
              segment.targetText,
            status:
              localChanges[segment.sourceSegmentId]?.status ?? segment.status,
            placeholder: renderAutoTranslation(segment.id),
          }}
          handlers={{
            onChange: (e: ChangeEvent<HTMLTextAreaElement>) =>
              handleTextChange(e.target.value, segment.sourceSegmentId),
            onClick: () => setActiveId(segment.sourceSegmentId),
            onStatusChange: () => handleStatusChange(segment),
            onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) =>
              onKeyDown(e, segment, autoTranslation ?? null),
          }}
        />
      ))}
    </ContentContainer>
  );
}
