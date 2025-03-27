import { LoaderCircle } from "lucide-react";
import Container from "./Container";

type LoadingSpinnerProps = {
  size?: number;
  variant?: "full-screen" | "inline";
};

export default function LoadingSpinner({
  size,
  variant = "full-screen",
}: LoadingSpinnerProps) {
  const spinner = (
    <LoaderCircle
      className={`animate-spin text-cat-accent`}
      size={size || (variant === "full-screen" ? 50 : 25)}
    />
  );

  function renderFullScreen() {
    return (
      <Container className="absolute inset-0 flex items-center justify-center bg-white z-10">
        {spinner}
      </Container>
    );
  }

  function renderInline() {
    return <>{spinner}</>;
  }

  return variant === "full-screen" ? renderFullScreen() : renderInline();
}
