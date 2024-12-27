import { Check } from "lucide-react";

type TranslationStatusProps = {
  isCompleted: boolean;
  onClick: () => void;
};

export default function TranslationStatus({
  isCompleted,
  onClick,
}: TranslationStatusProps) {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 flex items-center justify-center rounded-md border border-border hover:border-cat-accent/50"
    >
      {isCompleted && <Check className="h-4 w-4 text-green-500" />}
    </button>
  );
}
