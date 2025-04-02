import { useRef, useState } from "react";
import ViewerControls from "./ViewerControls";
import { useViewer } from "@/hooks/useViewer";
import DocViewerSkeleton from "./DocViewerSkeleton";
import { A4_LAYOUT_CONFIG } from "@/utils/constants";
import DocViewerError from "./DocViewerError";
import { useViewerScale } from "@/hooks/useViewerScale";
import { useLoadIframe } from "@/hooks/useLoadIframe";
import DocViewerContainer from "./DocViewerContainer";

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
  const [mode, setMode] = useState<Mode>("original");
  const { pages } = useViewer(html[mode] ?? null);
  const { isLoading, error } = useLoadIframe(html[mode], iframeRef, {
    width: A4_LAYOUT_CONFIG.width,
    height: A4_LAYOUT_CONFIG.height,
    padding: A4_LAYOUT_CONFIG.padding,
    gap: A4_LAYOUT_CONFIG.gap,
  });
  const { scale, calculateScale, updateScale } = useViewerScale(containerRef, {
    initialScale,
    width: A4_LAYOUT_CONFIG.width,
    onScaleChange,
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <DocViewerSkeleton
          maxHeight={maxHeight}
          width={A4_LAYOUT_CONFIG.width}
          height={A4_LAYOUT_CONFIG.height}
        />
      );
    }

    if (error) {
      return (
        <DocViewerError
          error={error}
          config={{ maxHeight, scale, width: A4_LAYOUT_CONFIG.width }}
        />
      );
    }

    const iframeHeight =
      Math.max(1, pages) * (A4_LAYOUT_CONFIG.height + 2 * A4_LAYOUT_CONFIG.gap);

    return (
      <div
        ref={containerRef}
        className="flex justify-center bg-muted overflow-auto"
        style={{ maxHeight }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: `${A4_LAYOUT_CONFIG.width}px`,
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
    <DocViewerContainer>
      <ViewerControls
        scaleControls={{ scale, updateScale, calculateScale }}
        viewMode={html.translation ? { mode, onChange: setMode } : null}
      />
      {renderContent()}
    </DocViewerContainer>
  );
}
