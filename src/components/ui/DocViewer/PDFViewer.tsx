import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { GalleryHorizontal, ZoomIn, ZoomOut } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface PDFViewerProps {
  pdfUrl: string;
  initialScale?: number;
  maxHeight?: string;
  onScaleChange?: (scale: number) => void;
  title?: string;
}

export default function PDFViewer({
  pdfUrl,
  initialScale = 1,
  maxHeight = "80vh",
  onScaleChange,
  title = "PDF Document",
}: PDFViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const objectRef = useRef<HTMLObjectElement | null>(null);
  const [scale, setScale] = useState<number>(initialScale);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Standard A4 dimensions in pixels (assuming 96 DPI)
  const pdfWidth = 794; // ~210mm at 96 DPI
  const pdfHeight = 1123; // ~297mm at 96 DPI

  const calculateScale = (): void => {
    const containerWidth: number =
      containerRef.current?.clientWidth || window.innerWidth * 0.9;

    // Calculate the scale factor to fit the container width
    const newScale: number = Math.min(1, containerWidth / pdfWidth);
    updateScale(newScale);
  };

  const updateScale = (newScale: number): void => {
    setScale(newScale);
    if (onScaleChange) {
      onScaleChange(newScale);
    }
  };

  // Handle PDF load
  const handleLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Calculate scale on initial render
    calculateScale();

    // Recalculate when window resizes
    const handleResize = (): void => {
      calculateScale();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container className="flex flex-col w-full">
      <Container className="flex items-center gap-3 mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateScale(Math.max(0.3, scale - 0.1))}
          aria-label="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <span className="text-sm font-medium">{Math.round(scale * 100)}%</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateScale(scale + 0.1)}
          aria-label="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => calculateScale()}
          aria-label="Fit to width"
        >
          <GalleryHorizontal className="w-4 h-4" />
        </Button>
      </Container>

      <div
        ref={containerRef}
        className="flex justify-center border border-border bg-muted p-5 overflow-auto rounded-sm"
        style={{ maxHeight }}
      >
        <div
          className="relative bg-white shadow-md"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: pdfWidth,
            height: pdfHeight,
          }}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}
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
