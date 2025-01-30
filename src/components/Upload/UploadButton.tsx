import { Globe, LoaderCircle } from "lucide-react";
import Container from "../ui/Container";

type UploadButtonProps = {
  isProcessing: boolean;
};

export default function UploadButton({ isProcessing }: UploadButtonProps) {
  return (
    <Container className="flex justify-center">
      <button
        className="inline-flex items-center bg-gradient-to-r from-primary to-purple-600 hover:from-primary hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <LoaderCircle className="w-5 h-5 mr-2 animate-spin" />
        ) : (
          <Globe className="w-5 h-5 mr-2" />
        )}
        Traduire
      </button>
      {/* <Button
        onClick={onClick}
        disabled={isProcessing}
        className={cn("disabled:opacity-50 disabled:cursor-not-allowed")}
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing Files...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            Start translation
          </>
        )}
      </Button> */}
    </Container>
  );
}
