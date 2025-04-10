import Container from "@/components/ui/Container";
import ProgressBar from "@/components/ui/ProgressBar";

type TranslationProgressProps = {
  current: number;
  total: number;
};

export default function TranslationProgress({
  current,
  total,
}: TranslationProgressProps) {
  const progress = (current / total) * 100;

  return (
    <Container className="flex gap-4 items-center">
      <ProgressBar progress={progress} />
      <Container className="text-muted-foreground text-xs whitespace-nowrap">
        {current} of {total} segments ({Math.round(progress)}%){" "}
      </Container>
    </Container>
  );
}
