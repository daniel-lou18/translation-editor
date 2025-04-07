import Container from "./Container";

type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <Container className="flex-1 min-w-28 max-w-32 h-1.5 rounded-full bg-gray-300 overflow-hidden">
      <div
        className={`h-full bg-cat-accent`}
        style={{ width: `${progress}%` }}
      ></div>
    </Container>
  );
}
