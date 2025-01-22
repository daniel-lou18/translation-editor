import { convertToPercent } from "@/utils/helpers";
import Container from "@/components/ui/Container";
import { Bot } from "lucide-react";
import { SemanticMatch } from "@/types";

interface MemoryMatchProps {
  match: SemanticMatch;
  onClick: () => void;
  variant: "tm" | "ai";
}

export function MemoryMatch({
  match,
  onClick,
  variant = "tm",
}: MemoryMatchProps) {
  const { sourceText, targetText, similarityScore } = match;
  const score = convertToPercent(similarityScore);

  return (
    <Container
      role="button"
      className="rounded-lg border border-gray-100 bg-cat-memory hover:bg-cat-accent/20 p-4 animate-fade-in transition-all"
      onClick={onClick}
    >
      <Container className="mb-2 flex items-center justify-between text-xs">
        <span className="font-medium text-cat-accent">{score}% Match</span>
        <span className="font-medium text-cat-accent">
          {variant === "tm" ? "TM" : <Bot size={18} />}
        </span>
      </Container>
      <Container className="space-y-2 text-xs">
        <p className="text-gray-600">{sourceText}</p>
        <p className="font-medium">{targetText}</p>
      </Container>
    </Container>
  );
}
