import Container from "@/components/ui/Container";
import { useRef, useState } from "react";
import ViewerControls from "./ViewerControls";
import { Html } from "./HtmlViewer";
import ErrorMessage from "../Error/ErrorMessage";
import DocViewerSkeleton from "./DocViewerSkeleton";
import { useParseDocxHtml } from "@/hooks/useParseDocxHtml";
import { useViewerScale } from "@/hooks/useViewerScale";

export type Mode = "original" | "translation";

type DocxViewerProps = {
  html: Html;
  initialScale?: number;
  maxHeight?: string;
  onScaleChange?: (scale: number) => void;
};

export default function DocxViewer({
  html,
  initialScale = 1,
  maxHeight = "80vh",
  onScaleChange,
}: DocxViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<Mode>("original");
  const { docData, error, isLoading } = useParseDocxHtml(html[mode]);
  const { scale, calculateScale, updateScale } = useViewerScale(containerRef, {
    initialScale,
    width: docData.layout.width,
    onScaleChange,
  });

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <Container className="flex flex-col w-full">
      <ViewerControls
        scaleControls={{ scale, updateScale, calculateScale }}
        viewMode={html.translation ? { mode, onChange: setMode } : null}
      />

      {isLoading ? (
        <DocViewerSkeleton
          maxHeight={maxHeight}
          width={docData.layout.width}
          height={docData.layout.minHeight}
        />
      ) : (
        <div
          ref={containerRef}
          className="flex justify-center px-12 py-8 border border-border bg-white overflow-auto rounded-sm docx-viewer-container"
          style={{ maxHeight }}
        >
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            <style dangerouslySetInnerHTML={{ __html: docData.styles }} />
            <div
              dangerouslySetInnerHTML={{ __html: docData.content }}
              style={{ ...docData.layout }}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
