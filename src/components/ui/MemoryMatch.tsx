interface MemoryMatchProps {
  sourceText: string;
  targetText: string;
  similarityScore: number;
}

export function MemoryMatch({
  sourceText,
  targetText,
  similarityScore,
}: MemoryMatchProps) {
  return (
    <div className="rounded-lg border border-gray-100 bg-cat-memory p-4 animate-fade-in">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-cat-accent">
          {similarityScore}% Match
        </span>
      </div>
      <div className="space-y-2 text-sm">
        <p className="text-gray-600">{sourceText}</p>
        <p className="font-medium">{targetText}</p>
      </div>
    </div>
  );
}
