import { TranslationMemoryMatches } from "@/types";
import { MemoryMatch } from "./MemoryMatch";

type MemoryMatchesProps = {
  activeSegment: number;
  matches: TranslationMemoryMatches;
};
export default function MemoryMatches({
  activeSegment,
  matches,
}: MemoryMatchesProps) {
  const currentMatches = matches[activeSegment];

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
