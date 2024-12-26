import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCallback, useRef } from "react";
import { useAutoFill } from "@/hooks/useAutoFill";
import { DocumentSegment } from "@/types";

interface TranslationSegmentProps {
  data: DocumentSegment;
  isCompleted?: boolean;
  autoTranslation: string | null;
  onTargetChange: (value: string) => void;
  onClick: () => void;
  onTab: (id: number) => void;
}

export function TranslationSegment({
  data,
  isCompleted = false,
  autoTranslation,
  onTargetChange,
  onTab,
  onClick,
}: TranslationSegmentProps) {
  const { id, source, target } = data;
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  useAutoFill(
    textAreaRef,
    useCallback(() => onTab(id), [onTab, id])
  );

  return (
    <div className="group flex items-start gap-4 p-4 hover:bg-gray-50 segment-transition">
      <div className="w-12 pt-3">
        <span className="text-xs font-medium text-gray-400">{id}</span>
      </div>
      <div className="flex-1">
        <div className="rounded-lg bg-cat-source p-3 text-sm">{source}</div>
      </div>
      <div className="flex-1">
        <textarea
          ref={textAreaRef}
          value={target}
          onChange={(e) => onTargetChange(e.target.value)}
          onClick={onClick}
          className={cn(
            "w-full rounded-lg bg-cat-target p-3 text-sm outline-none ring-offset-2",
            "focus:ring-2 focus:ring-cat-accent/20 segment-transition",
            "min-h-[80px] resize-none"
          )}
          placeholder={autoTranslation || "Enter translation..."}
        />
      </div>
      <div className="w-12 flex justify-center pt-3">
        {isCompleted && <Check className="h-4 w-4 text-green-500" />}
      </div>
    </div>
  );
}
