import { Globe } from "lucide-react";
import Container from "../Container";
import ButtonLoader from "../ButtonLoader";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { Button } from "../button";
type UploadButtonProps = PropsWithChildren<{
  isProcessing: boolean;
  disabled: boolean;
  className?: string;
}>;

export default function UploadButton({
  children,
  isProcessing,
  className,
  disabled,
}: UploadButtonProps) {
  const isDisabled = isProcessing || disabled;
  return (
    <Container className={cn("flex justify-center", className)}>
      <Button
        className={`inline-flex items-center bg-gradient-to-r from-primary to-purple-600 hover:from-primary hover:to-purple-700 text-md text-white font-semibold rounded-full shadow-xl transform transition duration-300 ease-in-out outline-none ring-2 ring-purple-500  ${
          isDisabled ? "ring-opacity-0" : "ring-opacity-50"
        }`}
        disabled={isDisabled}
      >
        <ButtonLoader isLoading={isProcessing} icon={Globe} iconSize={28}>
          {children}
        </ButtonLoader>
      </Button>
    </Container>
  );
}
