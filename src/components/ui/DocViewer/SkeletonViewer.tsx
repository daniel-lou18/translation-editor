import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { GalleryHorizontal, ZoomIn, ZoomOut } from "lucide-react";
import { useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonViewerProps {
  maxHeight?: string;
}

export default function SkeletonViewer({
  maxHeight = "80vh",
}: SkeletonViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState<number>(1);

  return (
    <Container className="flex flex-col w-full">
      <Container className="flex items-center gap-3 mb-4">
        <Button variant="outline" size="icon" disabled aria-label="Zoom out">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <span className="text-sm font-medium">{Math.round(scale * 100)}%</span>
        <Button variant="outline" size="icon" disabled aria-label="Zoom in">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          disabled
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
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: "794px", // A4 width at 96 DPI
            height: "1123px", // A4 height at 96 DPI
          }}
        >
          <div
            className="w-full h-full bg-background"
            style={{
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div className="p-10 flex flex-col gap-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="py-4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <div className="py-4" />
              <Skeleton className="h-40 w-full" />
              <div className="py-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
