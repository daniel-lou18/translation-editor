import Container from "@/components/ui/Container";
import { useRef, useEffect, useState } from "react";
import ViewerControls from "./ViewerControls";

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

  const calculateScale = (): void => {
    // Default A4 dimensions in pixels (assuming 96 DPI)
    const a4Width: number = 794; // ~210mm at 96 DPI
    const containerWidth: number =
      containerRef.current?.clientWidth || window.innerWidth * 0.9;

    // Calculate the scale factor to fit the container width
    const newScale: number = Math.min(1, containerWidth / a4Width);
    updateScale(newScale);
  };

  const updateScale = (newScale: number): void => {
    setScale(newScale);
    if (onScaleChange) {
      onScaleChange(newScale);
    }
  };

  useEffect(() => {
    // Calculate scale on initial render
    calculateScale();

    // Recalculate when window resizes
    const handleResize = (): void => {
      calculateScale();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Write HTML content to iframe
  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;

      if (iframeDoc) {
        // Write a complete HTML document to the iframe
        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body {
                  margin: 0;
                  padding: 40px;
                  font-family: sans-serif;
                  box-sizing: border-box;
                  background-color: white;
                }
                * {
                  box-sizing: border-box;
                }
              </style>
            </head>
            <body>${html[mode]}</body>
          </html>
        `);
        iframeDoc.close();
      }
    }
  }, [html, mode, iframeRef.current]);

  return (
    <Container className="flex flex-col w-full">
      <ViewerControls
        scaleControls={{ scale, updateScale, calculateScale }}
        viewMode={html.translation ? { mode, onChange: setMode } : null}
      />

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
          <iframe
            ref={iframeRef}
            title="Document Preview"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
            sandbox="allow-same-origin"
          />
        </div>
      </div>
    </Container>
  );
}
