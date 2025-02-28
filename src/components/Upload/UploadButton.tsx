import { Globe } from "lucide-react";
import Container from "../ui/Container";
import ButtonLoader from "../ui/ButtonLoader";
import { cn } from "@/lib/utils";
type UploadButtonProps = {
  isProcessing: boolean;
  className?: string;
};

export default function UploadButton({ isProcessing, className }: UploadButtonProps) {
  return (
    <Container className={cn("flex justify-center", className)}>
      <button
        className="inline-flex items-center bg-gradient-to-r from-primary to-purple-600 hover:from-primary hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        disabled={isProcessing}
      >
        <ButtonLoader isLoading={isProcessing} icon={Globe}>
          Translate
        </ButtonLoader>
      </button>
    </Container>
  );
}
