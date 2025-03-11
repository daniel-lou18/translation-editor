import { EditorSegmentType } from "@/types/Segment";
import Container from "@/components/ui/Container";
import { useFocus } from "@/hooks/useFocus";
import { useScrollHeight } from "@/hooks/useScrollHeight";
import { ChangeEvent, KeyboardEvent } from "react";
import TranslationStatus from "@/components/TextEditor/Segments/TranslationStatus";

interface EditorSegmentProps {
  data: EditorSegmentType;
  handlers: {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onClick: () => void;
    onStatusChange: () => void;
    onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  };
}

export function EditorSegment({ data, handlers }: EditorSegmentProps) {
  const { id, activeId, index, sourceText, targetText, status, placeholder } =
    data;
  const { textAreaRef, sourceDivRef, onInput } = useScrollHeight();
  useFocus(textAreaRef, activeId, id);

  return (
    <Container
      className={`min-h-0 group flex items-stretch gap-4 px-4 py-2 focus-within:bg-cat-accent/10 hover:bg-gray-100 transition-all duration-300 ease-in-out`}
    >
      <div ref={sourceDivRef} className="w-12 pt-2 font-medium text-gray-400">
        {index + 1}
      </div>
      <Container className="flex-1 rounded-lg p-2 text-sm">
        {sourceText}
      </Container>
      <textarea
        ref={textAreaRef}
        value={targetText || ""}
        onChange={handlers.onChange}
        onClick={handlers.onClick}
        onInput={onInput}
        onKeyDown={handlers.onKeyDown}
        className={`flex-1 h-fit rounded-lg p-2 text-sm outline-none -outline-offset-2 focus:outline-2 focus:outline-cat-accent/50 hover:bg-background focus:bg-background transition-all resize-none bg-cat-memory/30`}
        placeholder={placeholder ?? ""}
        rows={1}
      />
      <TranslationStatus
        isCompleted={status === "translated"}
        onClick={handlers.onStatusChange}
      />
    </Container>
  );
}
