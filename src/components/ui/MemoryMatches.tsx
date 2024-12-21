import { TranslationMemoryMatch } from "@/pages/TextEditor";
import { MemoryMatch } from "./MemoryMatch";

type MemoryMatchesProps = {
  activeSegment: number;
  matches: TranslationMemoryMatch[];
};
export default function MemoryMatches({
  activeSegment,
  matches,
}: MemoryMatchesProps) {
  const currentMatches = matches.filter(
    (matchResult) => matchResult.id === activeSegment
  )[0];

  return (
    <>
      {currentMatches.matches.map((match, index) => (
        <MemoryMatch key={index} {...match} />
      ))}
    </>
  );
}
