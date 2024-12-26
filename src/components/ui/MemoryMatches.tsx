import { TranslationMemoryMatches } from "@/types";
import { MemoryMatch } from "./MemoryMatch";

type MemoryMatchesProps = {
  activeSegmentId: number;
  matches: TranslationMemoryMatches;
};
export default function MemoryMatches({
  activeSegmentId,
  matches,
}: MemoryMatchesProps) {
  const currentMatches = matches[activeSegmentId];

  if (!currentMatches || currentMatches.matches.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {currentMatches.matches.map((match, index) => (
        <MemoryMatch key={index} {...match} />
      ))}
    </>
  );
}
