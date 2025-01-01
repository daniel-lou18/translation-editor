import Container from "./Container";

type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <Container className="max-w-32 w-full h-2 rounded-full bg-gray-300 overflow-hidden">
      <div
        className={`h-full bg-cat-accent`}
        style={{ width: `${progress}%` }}
      ></div>
    </Container>
  );
}
