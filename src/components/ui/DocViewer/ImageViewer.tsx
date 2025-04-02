import Container from "@/components/ui/Container";
import { useRef, useEffect, useState } from "react";
import ViewerControls from "./ViewerControls";
import { useViewerScale } from "@/hooks/useViewerScale";

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
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const { scale, calculateScale, updateScale } = useViewerScale(containerRef, {
    initialScale,
    width: imageDimensions.width,
    onScaleChange,
  });

  // Handle image load to get dimensions
  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight,
      });
    }
  };

  useEffect(() => {
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
      <ViewerControls scaleControls={{ scale, updateScale, calculateScale }} />

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
          <img
            ref={imageRef}
            src={imageUrl}
            alt={alt}
            onLoad={handleImageLoad}
            className="max-w-full"
            style={{
              minHeight: maxHeight,
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          />
        </div>
      </div>
    </Container>
  );
}
