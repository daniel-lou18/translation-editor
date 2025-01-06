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
  console.log(progress);
  return (
    <Container className="flex gap-2 items-center flex-1">
      <ProgressBar progress={progress} />
      <Container className="flex-1 text-muted-foreground text-sm">
        {current} of {total} segments ({Math.round(progress)}%){" "}
      </Container>
    </Container>
  );
}
