import Container from "@/components/ui/Container";
import { useRef, useState } from "react";
import ViewerControls from "./ViewerControls";
import DocViewerSkeleton from "./DocViewerSkeleton";
import { A4_HEIGHT, A4_WIDTH } from "@/utils/constants";
import { useViewerScale } from "@/hooks/useViewerScale";

interface PDFViewerProps {
  pdfUrl: string;
  initialScale?: number;
  onScaleChange?: (scale: number) => void;
  title?: string;
}

export default function PDFViewer({
  pdfUrl,
  initialScale = 1,
  onScaleChange,
  title = "PDF Document",
}: PDFViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const objectRef = useRef<HTMLObjectElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { scale, calculateScale, updateScale } = useViewerScale(containerRef, {
    initialScale,
    width: A4_WIDTH,
    onScaleChange,
  });

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <Container className="flex flex-col w-full">
      <ViewerControls scaleControls={{ scale, updateScale, calculateScale }} />

      <div
        ref={containerRef}
        className="flex justify-center border border-border bg-muted p-5 rounded-sm overflow-auto"
      >
        <div
          className="relative bg-white shadow-md"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: A4_WIDTH,
            height: A4_HEIGHT,
          }}
        >
          {isLoading && <DocViewerSkeleton />}
          <object
            ref={objectRef}
            data={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            type="application/pdf"
            width="100%"
            height="100%"
            className="shadow-md"
            onLoad={handleLoad}
            aria-label={title}
          >
            <div className="p-4 text-center">
              <p>Your browser doesn't support embedded PDFs.</p>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Download the PDF
              </a>
            </div>
          </object>
        </div>
      </div>
    </Container>
  );
}
