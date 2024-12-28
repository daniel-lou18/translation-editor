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
      className="w-7 h-7 self-center flex items-center justify-center rounded-md border border-border hover:border-cat-accent/50"
    >
      {isCompleted && <Check className="h-5 w-5 text-green-500" />}
    </button>
  );
}
