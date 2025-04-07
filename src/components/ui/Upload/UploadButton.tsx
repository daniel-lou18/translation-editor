import { Globe } from "lucide-react";
import Container from "../Container";
import ButtonLoader from "../ButtonLoader";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { Button } from "../button";
type UploadButtonProps = PropsWithChildren<{
  isProcessing: boolean;
  disabled?: boolean;
  className?: string;
}>;

export default function UploadButton({
  children,
  isProcessing,
  className,
  disabled = true,
}: UploadButtonProps) {
  return (
    <Container className={cn("flex justify-center", className)}>
      <Button
        className="inline-flex items-center bg-gradient-to-r from-primary to-purple-600 hover:from-primary hover:to-purple-700 text-md text-white font-semibold rounded-full shadow-xl transform transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        disabled={isProcessing || disabled}
      >
        <ButtonLoader isLoading={isProcessing} icon={Globe} iconSize={28}>
          {children}
        </ButtonLoader>
      </Button>
    </Container>
  );
}
