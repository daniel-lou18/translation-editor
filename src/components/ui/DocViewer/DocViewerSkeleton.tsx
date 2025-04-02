import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/ui/Container";
import { useRef } from "react";

interface DocViewerSkeletonProps {
  maxHeight?: string;
  width?: number;
  height?: number;
  showSideBySide?: boolean;
}

export default function DocViewerSkeleton({
  maxHeight = "80vh",
  width = 794, // Default A4 width at 96 DPI
  height = 1123, // Default A4 height at 96 DPI
  showSideBySide = false,
}: DocViewerSkeletonProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const skeletonContent = (
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
  );

  return (
    <div
      ref={containerRef}
      className="flex justify-center border border-border bg-muted p-5 overflow-auto rounded-sm"
      style={{ maxHeight }}
    >
      <Container
        className={`flex ${showSideBySide ? "flex-row gap-4" : "flex-col"}`}
      >
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          {skeletonContent}
        </div>

        {showSideBySide && (
          <div
            style={{
              width: `${width}px`,
              height: `${height}px`,
            }}
          >
            {skeletonContent}
          </div>
        )}
      </Container>
    </div>
  );
}
