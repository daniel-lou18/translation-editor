import { useRef, useEffect, useState } from "react";
import ViewerControls from "./ViewerControls";
import { useViewerScale } from "@/hooks/useViewerScale";
import DocViewerContainer from "./DocViewerContainer";

interface ImageViewerProps {
  imageData: {
    fileName: string;
    imageUrl: string;
    alt?: string;
  };
  layout?: {
    initialScale?: number;
    maxHeight?: string;
    onScaleChange?: (scale: number) => void;
  };
}

export default function ImageViewer({
  imageData: { fileName, imageUrl, alt = "Image preview" },
  layout: { initialScale = 1, maxHeight = "80vh", onScaleChange } = {},
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
    <DocViewerContainer>
      <ViewerControls
        scaleControls={{ scale, updateScale, calculateScale }}
        fileName={fileName}
      />

      <div
        ref={containerRef}
        className="flex justify-center bg-muted p-5 overflow-auto"
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
    </DocViewerContainer>
  );
}
