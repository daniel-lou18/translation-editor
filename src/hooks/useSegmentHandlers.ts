import { useEditor } from "@/contexts/editorContext";
import { ChangeEvent, KeyboardEvent } from "react";

export function useSegmentHandlers(
  segmentId: number,
  autoTranslation: string | null
) {
  const {
    activeSegmentId,
    handleValueChange,
    handleSegmentChange,
    handleStatusChange,
    setStatus,
    toNextSegment,
  } = useEditor();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    console.log({ value });
    handleValueChange(segmentId, value);
  };

  const onClick = () => handleSegmentChange(segmentId);

  const onStatusChange = () => handleStatusChange(segmentId);

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      onTab();
    }
    if (e.key === "Enter") {
      e.preventDefault();
      onEnter();
    }
  };

  const onTab = () => {
    if (!autoTranslation) return;
    handleValueChange(segmentId, autoTranslation);
  };

  const onEnter = () => {
    setStatus(activeSegmentId, "translated");
    toNextSegment();
  };

  return { onChange, onClick, onStatusChange, onKeyDown };
}
