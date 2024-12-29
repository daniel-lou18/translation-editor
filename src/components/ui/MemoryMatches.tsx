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
  const { activeSegmentId } = useEditor();
  const { processedSegments, totalSegments, percentage } = progress;

  const currentMatches = matches?.[activeSegmentId];
  console.log(matches);

  return (
    <Container className="col-span-3 space-y-4 sticky top-8 min-h-screen h-fit">
      <Container className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-sm font-medium text-gray-900">
          Translation Memory
        </h2>
        <Container className="space-y-3">
          {isLoading ||
          !currentMatches ||
          currentMatches.matches.length === 0 ? (
            <ProgressBar
              processedSegments={processedSegments}
              totalSegments={totalSegments}
              percentage={percentage}
            />
          ) : (
            currentMatches.matches.map((match, index) => (
              <MemoryMatch key={index} {...match} />
            ))
          )}
        </Container>
      </Container>
    </Container>
  );
}
