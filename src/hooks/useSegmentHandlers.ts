import { useEditor } from "@/contexts/editorContext";
import { ChangeEvent, KeyboardEvent } from "react";

export function useSegmentHandlers() {
  const {
    handleValueChange,
    handleSegmentChange,
    handleStatusChange,
    setStatus,
    toNextSegment,
  } = useEditor();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>, segmentId: number) => {
    const value = e.target.value;
    handleValueChange(segmentId, value);
  };

  const onClick = (segmentId: number) => handleSegmentChange(segmentId);

  const onStatusChange = (segmentId: number) => handleStatusChange(segmentId);

  const onKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>,
    segmentId: number,
    autoTranslation: string | null
  ) => {
    if (e.key === "Tab") {
      e.preventDefault();
      onTab(segmentId, autoTranslation);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      onEnter(segmentId);
    }
  };

  const onTab = (segmentId: number, autoTranslation: string | null) => {
    if (!autoTranslation) return;
    handleValueChange(segmentId, autoTranslation);
  };

  const onEnter = (segmentId: number) => {
    setStatus(segmentId, "translated");
    toNextSegment();
  };

  return { onChange, onClick, onStatusChange, onKeyDown };
}
