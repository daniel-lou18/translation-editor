import { useEditor } from "@/contexts/editorContext";
import { TranslationSegment } from "./TranslationSegment";
import { SemanticMatch } from "@/types";
import { useAutoTranslation } from "@/hooks/useAutoTranslation";
import Container from "../../ui/Container";

type TranslationSegmentsProps = {
  matches: SemanticMatch[] | null;
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
    getActiveSegment,
  } = useEditor();
  const activeSegment = getActiveSegment();
  const { data: autoTranslations, isPending: isLoading } = useAutoTranslation(
    activeSegment,
    matches
  );
  const autoTranslation = autoTranslations?.[activeSegmentId];

  const renderAutoTranslation = (id: number) => {
    if (activeSegmentId !== id || (!autoTranslation && !isLoading)) return null;
    if (isLoading) return "Loading translation...";
    return autoTranslation || null;
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
