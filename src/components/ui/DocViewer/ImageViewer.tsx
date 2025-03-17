import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { GalleryHorizontal, ZoomIn, ZoomOut } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface ImageViewerProps {
  imageUrl: string;
  initialScale?: number;
  maxHeight?: string;
  onScaleChange?: (scale: number) => void;
  alt?: string;
}

export default function ImageViewer({
  imageUrl,
  initialScale = 1,
  maxHeight = "80vh",
  onScaleChange,
  alt = "Image preview",
}: ImageViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [scale, setScale] = useState<number>(initialScale);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const calculateScale = (): void => {
    if (!imageLoaded || !imageDimensions.width) return;

    const containerWidth: number =
      containerRef.current?.clientWidth || window.innerWidth * 0.9;

    // Calculate the scale factor to fit the container width
    const newScale: number = Math.min(
      1,
      containerWidth / imageDimensions.width
    );
    updateScale(newScale);
  };

  const updateScale = (newScale: number): void => {
    setScale(newScale);
    if (onScaleChange) {
      onScaleChange(newScale);
    }
  };

  // Handle image load to get dimensions
  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
      setImageLoaded(true);
    }
  };

  useEffect(() => {
    // Calculate scale once image is loaded
    if (imageLoaded) {
      calculateScale();
    }
  }, [imageLoaded]);

  useEffect(() => {
    // Recalculate when window resizes
    const handleResize = (): void => {
      calculateScale();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [imageLoaded]);

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
            width: imageDimensions.width || "auto",
            height: imageDimensions.height || "auto",
          }}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}
          <img
            ref={imageRef}
            src={imageUrl}
            alt={alt}
            onLoad={handleImageLoad}
            className="max-w-full"
            style={{
              display: imageLoaded ? "block" : "none",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          />
        </div>
      </div>
    </Container>
  );
}
