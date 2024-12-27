import { TranslationMemoryMatches } from "@/types";
import { MemoryMatch } from "./MemoryMatch";
import { useEditor } from "@/contexts/editorContext";

type MemoryMatchesProps = {
  matches: TranslationMemoryMatches;
  isLoading: boolean;
};
export default function MemoryMatches({
  matches,
  isLoading,
}: MemoryMatchesProps) {
  const { activeSegmentId } = useEditor();

  if (Object.keys(matches).length === 0) return null;

  const currentMatches = matches[activeSegmentId];
  if (isLoading || !currentMatches || currentMatches.matches.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="col-span-4 space-y-4 sticky top-8 min-h-screen h-fit">
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-sm font-medium text-gray-900">
          Translation Memory
        </h2>
        <div className="space-y-3">
          {currentMatches.matches.map((match, index) => (
            <MemoryMatch key={index} {...match} />
          ))}
        </div>
      </div>
    </div>
  );
}
