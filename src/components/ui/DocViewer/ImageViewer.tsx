import Container from "@/components/ui/Container";
import { useRef, useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import ViewerControls from "./ViewerControls";

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
          {!imageLoaded && <LoadingSpinner />}
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
