import { cn } from "@/lib/utils";

type ErrorMessageProps = {
  error?: Error | null;
  message?: string;
  className?: string;
};

export default function ErrorMessage({
  error,
  message,
  className = "",
}: ErrorMessageProps) {
  const displayMessage =
    message || error?.message || "An unknown error occurred.";

  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {displayMessage}
    </p>
  );
}
