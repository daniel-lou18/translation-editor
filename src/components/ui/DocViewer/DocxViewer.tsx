import { useRef, useState } from "react";
import ViewerControls from "./ViewerControls";
import { Html } from "./HtmlViewer";
import ErrorMessage from "../Error/ErrorMessage";
import DocViewerSkeleton from "./DocViewerSkeleton";
import { useParseDocxHtml } from "@/hooks/useParseDocxHtml";
import { useViewerScale } from "@/hooks/useViewerScale";
import DocViewerContainer from "./DocViewerContainer";

export type Mode = "original" | "translation";

type DocxViewerProps = {
  data: {
    html: Html;
    fileName: string;
  };
  layout?: {
    initialScale?: number;
    maxHeight?: string;
    onScaleChange?: (scale: number) => void;
  };
};

export default function DocxViewer({
  data: { html, fileName },
  layout: { initialScale = 1, maxHeight = "80vh", onScaleChange } = {},
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
    <DocViewerContainer>
      {html.translation ? (
        <ViewerControls
          scaleControls={{ scale, updateScale, calculateScale }}
          viewMode={{ mode, onChange: setMode }}
        />
      ) : (
        <ViewerControls
          scaleControls={{ scale, updateScale, calculateScale }}
          fileName={fileName}
        />
      )}

      {isLoading ? (
        <DocViewerSkeleton
          maxHeight={maxHeight}
          width={docData.layout.width}
          height={docData.layout.minHeight}
        />
      ) : (
        <div
          ref={containerRef}
          className="flex justify-center px-12 py-8 bg-white/30 overflow-auto docx-viewer-container"
          // style={{ maxHeight }}
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
    </DocViewerContainer>
  );
}
