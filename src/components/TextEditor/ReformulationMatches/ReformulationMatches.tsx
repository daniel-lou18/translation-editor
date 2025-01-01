import { Match } from "@/types";
import Container from "@/components/ui/Container";
import { MemoryMatch } from "../MemoryMatch";
import { useEditor } from "@/contexts/editorContext";

type ReformulationMatchesProps = {
  sourceText: string;
  reformulation: string | undefined;
};
export default function ReformulationMatches({
  sourceText,
  reformulation,
}: ReformulationMatchesProps) {
  const { activeSegmentId, handleValueChange } = useEditor();

  if (!sourceText || !reformulation) return null;

  const match: Match = {
    sourceText,
    targetText: reformulation,
    similarityScore: 1,
  };

  return (
    <Container className="space-y-3 mb-3">
      <MemoryMatch
        match={match}
        onClick={() => handleValueChange(activeSegmentId, match.targetText)}
        variant="ai"
      />
    </Container>
  );
}
