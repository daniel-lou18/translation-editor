import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TranslationSegmentProps {
  id: number;
  source: string;
  target: string;
  isCompleted?: boolean;
  autoTranslation: string | null;
  onTargetChange: (value: string) => void;
  onClick: () => void;
}

export function TranslationSegment({
  id,
  source,
  target,
  isCompleted = false,
  autoTranslation,
  onTargetChange,
  onClick,
}: TranslationSegmentProps) {
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
