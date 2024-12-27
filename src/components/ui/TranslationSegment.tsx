import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef } from "react";
import { useAutoFill } from "@/hooks/useAutoFill";
import { DocumentSegment } from "@/types";
import TranslationStatus from "./TranslationStatus";
import Container from "./Container";

interface TranslationSegmentProps {
  data: DocumentSegment;
  autoTranslation: string | null;
  onTargetChange: (value: string) => void;
  onClick: () => void;
  onTab: () => void;
  onStatusChange: () => void;
  active: boolean;
}

export function TranslationSegment({
  data,
  autoTranslation,
  onTargetChange,
  onTab,
  onClick,
  onStatusChange,
  active,
}: TranslationSegmentProps) {
  const { id, source, target, completed } = data;

  const sourceDiv = useRef<HTMLDivElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  useAutoFill(textAreaRef, useCallback(onTab, [onTab]));

  // Function to auto-resize the textarea based on content
  const handleInput = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (sourceDiv.current && textAreaRef.current) {
      textAreaRef.current.style.height = `${sourceDiv.current.scrollHeight}px`;
    }
  }, []);

  return (
    <Container
      className={`min-h-0 group flex items-stretch gap-4 px-4 py-2 ${
        active ? "bg-cat-memory/80" : ""
      } hover:bg-gray-50 segment-transition`}
    >
      <div ref={sourceDiv} className="w-12 pt-2 font-medium text-gray-400">
        {id}
      </div>
      <Container className="flex-1 rounded-lg p-2 text-sm">{source}</Container>
      <textarea
        ref={textAreaRef}
        value={target}
        onChange={(e) => onTargetChange(e.target.value)}
        onClick={onClick}
        onInput={handleInput}
        className={cn(
          "flex-1 h-fit rounded-lg bg-cat-target p-2 text-sm outline-none ring-offset-2",
          "focus:ring-2 focus:ring-cat-accent/20 segment-transition",
          "resize-none"
        )}
        placeholder={autoTranslation || "Enter translation..."}
        rows={1}
      />
      <TranslationStatus isCompleted={completed} onClick={onStatusChange} />
    </Container>
  );
}
