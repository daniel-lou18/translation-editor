import { TranslationMemoryMatches } from "@/types";
import { MemoryMatch } from "./MemoryMatch";
import { useEditor } from "@/contexts/editorContext";
import ProgressBar from "./ProgressBar";
import Container from "./Container";

type MemoryMatchesProps = {
  matches: TranslationMemoryMatches;
  isLoading: boolean;
  progress: {
    totalSegments: number;
    processedSegments: number;
    percentage: number;
  };
};
export default function MemoryMatches({
  matches,
  isLoading,
  progress,
}: MemoryMatchesProps) {
  const { activeSegmentId, handleValueChange } = useEditor();
  const { processedSegments, totalSegments, percentage } = progress;

  const currentMatches = matches?.[activeSegmentId];

  return (
    <Container className="space-y-3">
      {isLoading || !currentMatches || currentMatches.matches.length === 0 ? (
        <ProgressBar
          processedSegments={processedSegments}
          totalSegments={totalSegments}
          percentage={percentage}
        />
      ) : (
        currentMatches.matches.map((match) => (
          <MemoryMatch
            key={match.sourceText}
            match={match}
            onClick={() => handleValueChange(activeSegmentId, match.targetText)}
            variant="tm"
          />
        ))
      )}
    </Container>
  );
}
