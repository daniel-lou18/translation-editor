import { useEffect, useState } from "react";
import { TranslationSegment } from "@/components/ui/TranslationSegment";
import { documentSegments } from "@/utils/sampleData";
import Header from "@/components/ui/Header";
import { getMatches } from "@/services/translationMemoryService";
import { DocumentSegment, TranslationMatch } from "@/types";
import MemoryMatches from "@/components/ui/MemoryMatches";

export type TranslationMemoryMatch = TranslationMatch & { id: number };

// const sampleMemoryMatches = [
//   {
//     sourceText: "Op negentien december tweeduizend tweeëntwintig",
//     targetText: "On the nineteenth of December two thousand and twenty-two",
//     similarity: 102,
//   },
//   {
//     sourceText: "VERKLARING VAN ERFRECHT",
//     targetText: "DECLARATION OF INHERITANCE",
//     similarity: 95,
//   },
// ];

export default function TextEditor() {
  const [segments, setSegments] = useState<DocumentSegment[]>(documentSegments);
  const [matches, setMatches] = useState<TranslationMemoryMatch[]>([]);
  const [activeSegment, setActiveSegment] = useState(1);

  useEffect(() => {
    async function fetchMatches() {
      const currentSegments = segments.slice(0, 10);
      const results = await getMatches({
        searchTerms: currentSegments.map((segment) => segment.source),
      });
      const matches = results.map((result, idx) => ({
        ...result,
        id: currentSegments[idx].id,
      }));
      console.log(results);
      setMatches(matches);
    }

    fetchMatches();
  }, [segments]);

  const handleTargetChange = (id: number, value: string) => {
    setSegments(
      segments.map((seg) => (seg.id === id ? { ...seg, target: value } : seg))
    );
  };

  const handleSegmentChange = (id: number) => setActiveSegment(id);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1600px] p-6">
        <Header />

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="divide-y divide-gray-100">
              {segments.map((segment) => (
                <TranslationSegment
                  key={segment.id}
                  id={segment.id}
                  source={segment.source}
                  target={segment.target}
                  isCompleted={segment.completed}
                  onTargetChange={(value) =>
                    handleTargetChange(segment.id, value)
                  }
                  onClick={() => handleSegmentChange(segment.id)}
                />
              ))}
            </div>
          </div>

          <div className="col-span-4 space-y-4">
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-sm font-medium text-gray-900">
                Translation Memory
              </h2>
              <div className="space-y-3">
                {matches.length > 0 ? (
                  <MemoryMatches
                    activeSegment={activeSegment}
                    matches={matches}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
