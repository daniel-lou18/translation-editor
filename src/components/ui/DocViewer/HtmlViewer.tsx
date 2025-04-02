import Container from "@/components/ui/Container";
import { useRef, useEffect, useState } from "react";
import ViewerControls from "./ViewerControls";
import { useViewer } from "@/hooks/useViewer";
import DocViewerSkeleton from "./DocViewerSkeleton";
import {
  A4_WIDTH,
  A4_HEIGHT,
  A4_PADDING,
  A4_PAGE_GAP,
} from "@/utils/constants";
import DocViewerError from "./DocViewerError";
import { generateHtmlLayout } from "./helpers";

type PDFPreviewProps = {
  html: Html;
  initialScale?: number;
  maxHeight?: string;
  onScaleChange?: (scale: number) => void;
};

export type Html = {
  original: string;
  translation?: string;
};

export type Mode = "original" | "translation";

export default function HtmlViewer({
  html,
  initialScale = 1,
  maxHeight = "80vh",
  onScaleChange,
}: PDFPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [scale, setScale] = useState<number>(initialScale);
  const [mode, setMode] = useState<Mode>("original");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { pages } = useViewer(html[mode] ?? null);

  const calculateScale = (): void => {
    // Default A4 dimensions in pixels (assuming 96 DPI)
    const containerWidth: number =
      containerRef.current?.clientWidth || window.innerWidth * 0.9;

    // Calculate the scale factor to fit the container width
    const newScale: number = Math.min(1, containerWidth / A4_WIDTH);
    updateScale(newScale);
  };

  const updateScale = (newScale: number): void => {
    setScale(newScale);
    if (onScaleChange) {
      onScaleChange(newScale);
    }
  };

  useEffect(() => {
    calculateScale();

    const handleResize = (): void => {
      calculateScale();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (!html[mode]) {
      setError("No content available");
      setIsLoading(false);
      return;
    }

    try {
      const iframe = iframeRef.current;
      if (!iframe) return;
      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) return;

      iframeDoc.open();
      iframeDoc.write(
        generateHtmlLayout(html[mode], {
          width: A4_WIDTH,
          height: A4_HEIGHT,
          padding: A4_PADDING,
          gap: A4_PAGE_GAP,
        })
      );
      iframeDoc.close();
    } catch (err) {
      console.error("Error rendering HTML content", err);
      setError("Failed to render HTML content");
    } finally {
      setIsLoading(false);
    }
  }, [html, mode]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <DocViewerSkeleton
          maxHeight={maxHeight}
          width={A4_WIDTH}
          height={A4_HEIGHT}
        />
      );
    }

    if (error) {
      return (
        <DocViewerError
          error={error}
          config={{ maxHeight, scale, width: A4_WIDTH }}
        />
      );
    }

    const iframeHeight = Math.max(1, pages) * (A4_HEIGHT + 2 * A4_PAGE_GAP);

    return (
      <div
        ref={containerRef}
        className="flex justify-center border border-border bg-muted overflow-auto rounded-sm"
        style={{ maxHeight }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: `${A4_WIDTH}px`,
          }}
        >
          <iframe
            ref={iframeRef}
            title="Document Preview"
            style={{
              width: "100%",
              height: `${iframeHeight}px`,
              border: "none",
            }}
            sandbox="allow-same-origin"
          />
        </div>
      </div>
    );
  };

  return (
    <Container className="flex flex-col w-full">
      <ViewerControls
        scaleControls={{ scale, updateScale, calculateScale }}
        viewMode={html.translation ? { mode, onChange: setMode } : null}
      />

      {renderContent()}
    </Container>
  );
}
