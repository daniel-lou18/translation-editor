import { useEditor } from "@/contexts/editorContext";
import { TranslationSegment } from "./TranslationSegment";
import { TranslationMemoryMatches } from "@/types";
import { useAutoTranslation } from "@/hooks/useAutoTranslation";
import Container from "./Container";

type TranslationSegmentsProps = {
  matches: TranslationMemoryMatches;
};

export default function TranslationSegments({
  matches,
}: TranslationSegmentsProps) {
  const {
    segments,
    activeSegmentId,
    handleValueChange,
    handleSegmentChange,
    handleStatusChange,
  } = useEditor();
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
    <Container className="col-span-9 rounded-xl border border-gray-100 bg-white shadow-sm divide-y divide-gray-100">
      {segments.map((segment) => (
        <TranslationSegment
          key={segment.id}
          data={segment}
          onTargetChange={(value) => handleValueChange(segment.id, value)}
          onClick={() => handleSegmentChange(segment.id)}
          onTab={() => handleTab(segment.id)}
          onStatusChange={() => handleStatusChange(segment.id)}
          autoTranslation={renderAutoTranslation(segment.id)}
        />
      ))}
    </Container>
  );
}
