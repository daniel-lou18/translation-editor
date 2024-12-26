import Header from "@/components/ui/Header";
import MemoryMatches from "@/components/ui/MemoryMatches";
import { useMatches } from "@/hooks/useMatches";
import TranslationSegments from "@/components/ui/TranslationSegments";
import { useAutoTranslation } from "@/hooks/useAutoTranslation";
import { useEditor } from "@/contexts/editorContext";

export default function TextEditor() {
  const { segments, activeSegmentId } = useEditor();
  const {
    data: matches,
    isPending,
    progress: { processedSegments, totalSegments, percentage },
  } = useMatches(segments);

  const { data: autoTranslation } = useAutoTranslation(
    activeSegmentId,
    segments,
    matches
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1600px] p-6">
        <Header />

        <p
          className={`${
            percentage === 100 ? "opacity-0" : ""
          } transition duration-1000`}
        >{`Processing ${processedSegments} of ${totalSegments} segments (${percentage} %)`}</p>

        <div className="grid grid-cols-12 gap-6 relative overflow-visible">
          <TranslationSegments autoTranslation={autoTranslation || null} />

          <div className="col-span-4 space-y-4 sticky top-8 min-h-screen h-fit">
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-sm font-medium text-gray-900">
                Translation Memory
              </h2>
              <div className="space-y-3">
                {Object.keys(matches).length > 0 ? (
                  <MemoryMatches
                    activeSegmentId={activeSegmentId}
                    matches={matches}
                  />
                ) : null}
                {isPending && <p>Loading...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
