import { SemanticMatch } from "@/types";
import { MemoryMatch } from "./MemoryMatch";
import { useEditor } from "@/contexts/editorContext";
import Container from "@/components/ui/Container";

type MemoryMatchesProps = {
  matches: SemanticMatch[] | null;
};
export default function MemoryMatches({ matches }: MemoryMatchesProps) {
  const { activeSegmentId, handleValueChange } = useEditor();

  if (!matches?.length) return null;

  return (
    <Container className="space-y-3">
      {matches.map((match) => (
        <MemoryMatch
          key={match.id}
          match={match}
          onClick={() => handleValueChange(activeSegmentId, match.targetText)}
          variant="tm"
        />
      ))}
    </Container>
  );
}
