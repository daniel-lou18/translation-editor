import Container from "@/components/ui/Container";
import { useRef, useEffect, useState } from "react";
import ViewerControls from "./ViewerControls";
import { useViewer } from "@/hooks/useViewer";

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

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;
const A4_PADDING = 96;
const PAGE_GAP = 40;

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

  // Window resize effect
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
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;

      if (iframeDoc && pages > 0) {
        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  font-family: ui-sans-serif, system-ui, sans-serif;
                  box-sizing: border-box;
                  background-color: #f5f5f5;
                  overflow: hidden
                }
                * {
                  box-sizing: border-box;
                }
                .pages-container {
                  padding: ${PAGE_GAP}px 0px;
                }
                .page {
                position: relative;
                width: ${A4_WIDTH}px;
                min-height: ${A4_HEIGHT}px;
                padding: ${A4_PADDING}px;
                margin: 0 auto ${PAGE_GAP}px;
                box-sizing: border-box;
                page-break-after: always;
                break-after: page;
                background-color: #fff;
                border-radius: 4px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              </style>
            </head>
            <body>
              <div class="pages-container">
                ${html[mode]}
              </div>
            </body>
          </html>
        `);
        iframeDoc.close();
      }
    }
  }, [pages, iframeRef.current, html[mode]]);

  return (
    <Container className="flex flex-col w-full">
      <ViewerControls
        scaleControls={{ scale, updateScale, calculateScale }}
        viewMode={html.translation ? { mode, onChange: setMode } : null}
      />

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
              height: pages * (A4_HEIGHT + 2 * PAGE_GAP) + "px", // Height for all pages plus margins
              border: "none",
            }}
            sandbox="allow-same-origin"
          />
        </div>
      </div>
    </Container>
  );
}
