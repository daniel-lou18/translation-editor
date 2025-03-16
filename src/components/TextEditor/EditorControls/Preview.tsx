import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { GalleryHorizontal, ZoomIn, ZoomOut } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface PDFPreviewProps {
  html: string;
  initialScale?: number;
  maxHeight?: string;
  onScaleChange?: (scale: number) => void;
}

export default function Preview({
  html,
  initialScale = 1,
  maxHeight = "80vh",
  onScaleChange,
}: PDFPreviewProps) {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState<number>(initialScale);

  const calculateScale = (): void => {
    // Default A4 dimensions in pixels (assuming 96 DPI)
    const a4Width: number = 794; // ~210mm at 96 DPI
    const containerWidth: number =
      previewRef.current?.parentElement?.clientWidth || window.innerWidth * 0.9;

    // Calculate the scale factor to fit the container width
    const newScale: number = Math.min(1, containerWidth / a4Width);
    updateScale(newScale);
  };

  const updateScale = (newScale: number): void => {
    setScale(newScale);
    if (onScaleChange) {
      onScaleChange(newScale);
    }
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

      <Container
        className="flex justify-center border border-border bg-muted p-5 overflow-auto rounded-sm"
        style={{ maxHeight }}
      >
        <div
          ref={previewRef}
          className="bg-white shadow-md relative box-border font-sans"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: "794px", // A4 width at 96 DPI
            minHeight: "1123px", // A4 height at 96 DPI
            padding: "40px",
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Container>
    </Container>
  );
}
