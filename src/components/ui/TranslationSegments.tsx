import { useEditor } from "@/contexts/editorContext";
import { TranslationSegment } from "./TranslationSegment";
import { useIsFetching } from "@tanstack/react-query";

type TranslationSegmentsProps = {
  autoTranslation: string | null;
};

export default function TranslationSegments({
  autoTranslation,
}: TranslationSegmentsProps) {
  const { segments, activeSegmentId, handleValueChange, handleSegmentChange } =
    useEditor();
  const isLoading = useIsFetching({ queryKey: ["auto-translation"] }) > 0;

  const renderAutoTranslation = (id: number) =>
    activeSegmentId === id
      ? isLoading
        ? "Loading translation..."
        : autoTranslation
      : null;

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
