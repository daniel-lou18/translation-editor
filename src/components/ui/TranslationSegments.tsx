import { useEditor } from "@/contexts/editorContext";
import { TranslationSegment } from "./TranslationSegment";
import { TranslationMemoryMatches } from "@/types";
import { useAutoTranslation } from "@/hooks/useAutoTranslation";

type TranslationSegmentsProps = {
  matches: TranslationMemoryMatches;
};

export default function TranslationSegments({
  matches,
}: TranslationSegmentsProps) {
  const { segments, activeSegmentId, handleValueChange, handleSegmentChange } =
    useEditor();
  const { data: autoTranslation, isPending: isLoading } = useAutoTranslation(
    activeSegmentId,
    segments,
    matches
  );

  const renderAutoTranslation = (id: number) => {
    if (activeSegmentId !== id) return null;
    if (isLoading) return "Loading translation...";
    if (!autoTranslation) return null;
    return autoTranslation;
  };

  const handleTab = (id: number) => {
    if (!autoTranslation) return;
    handleValueChange(id, autoTranslation);
  };

  return (
    <div className="col-span-8 rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="divide-y divide-gray-100">
        {segments.map((segment) => (
          <TranslationSegment
            key={segment.id}
            data={segment}
            isCompleted={segment.completed}
            onTargetChange={(value) => handleValueChange(segment.id, value)}
            onClick={() => handleSegmentChange(segment.id)}
            onTab={handleTab}
            autoTranslation={renderAutoTranslation(segment.id)}
          />
        ))}
      </div>
    </div>
  );
}
