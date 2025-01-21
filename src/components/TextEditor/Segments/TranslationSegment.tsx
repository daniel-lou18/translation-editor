import { Segment } from "@/types/Segment";
import TranslationStatus from "./TranslationStatus";
import Container from "@/components/ui/Container";
import { useFocus } from "@/hooks/useFocus";
import { useScrollHeight } from "@/hooks/useScrollHeight";
import { useSegmentHandlers } from "@/hooks/useSegmentHandlers";

interface TranslationSegmentProps {
  data: Segment;
  autoTranslation: string | null;
  activeId: number;
}

export function TranslationSegment({
  data,
  autoTranslation,
  activeId,
}: TranslationSegmentProps) {
  const { id, sourceText, targetText, status } = data;

  const { textAreaRef, sourceDivRef, onInput } = useScrollHeight();
  const { onChange, onClick, onStatusChange, onKeyDown } = useSegmentHandlers(
    id,
    autoTranslation
  );
  useFocus(textAreaRef, activeId, id);

  return (
    <Container
      className={`min-h-0 group flex items-stretch gap-4 px-4 py-2 focus-within:bg-cat-accent/10 hover:bg-gray-100 transition-all duration-300 ease-in-out`}
    >
      <div ref={sourceDivRef} className="w-12 pt-2 font-medium text-gray-400">
        {id}
      </div>
      <Container className="flex-1 rounded-lg p-2 text-sm">
        {sourceText}
      </Container>
      <textarea
        ref={textAreaRef}
        value={targetText || ""}
        onChange={onChange}
        onClick={onClick}
        onInput={onInput}
        onKeyDown={onKeyDown}
        className={`flex-1 h-fit rounded-lg p-2 text-sm outline-none -outline-offset-2 focus:outline-2 focus:outline-cat-accent/50 hover:bg-background focus:bg-background transition-all resize-none bg-cat-memory/30`}
        placeholder={autoTranslation || ""}
        rows={1}
      />
      <TranslationStatus
        isCompleted={status === "translated"}
        onClick={onStatusChange}
      />
    </Container>
  );
}
