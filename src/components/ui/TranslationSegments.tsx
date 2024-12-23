import { DocumentSegment } from "@/types";
import { TranslationSegment } from "./TranslationSegment";

type TranslationSegmentsProps = {
  segments: DocumentSegment[];
  handleTargetChange: (id: number, value: string) => void;
  handleSegmentChange: (id: number) => void;
  activeSegmentId: number;
  autoTranslation: string | null;
  isLoading: boolean;
};

export default function TranslationSegments({
  segments,
  handleTargetChange,
  handleSegmentChange,
  activeSegmentId,
  autoTranslation,
  isLoading,
}: TranslationSegmentsProps) {
  return (
    <div className="col-span-8 rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="divide-y divide-gray-100">
        {segments.map((segment) => (
          <TranslationSegment
            key={segment.id}
            id={segment.id}
            source={segment.source}
            target={segment.target}
            isCompleted={segment.completed}
            onTargetChange={(value) => handleTargetChange(segment.id, value)}
            onClick={() => handleSegmentChange(segment.id)}
            autoTranslation={
              activeSegmentId === segment.id
                ? isLoading
                  ? "Loading translation..."
                  : autoTranslation
                : null
            }
          />
        ))}
      </div>
    </div>
  );
}
