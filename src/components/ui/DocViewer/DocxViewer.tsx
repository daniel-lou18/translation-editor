import Container from "@/components/ui/Container";
import { useRef, useEffect, useState } from "react";
import ViewerControls from "./ViewerControls";
import { Html } from "./HtmlViewer";
import DOMPurify from "dompurify";
import ErrorMessage from "../Error/ErrorMessage";
import DocViewerSkeleton from "./DocViewerSkeleton";
import { DEFAULT_WORD_LAYOUT } from "@/utils/constants";
import { createScopedCss, parseDocxPageLayout } from "./helpers";

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
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState<number>(initialScale);
  const [mode, setMode] = useState<Mode>("original");
  const [docData, setDocData] = useState({
    styles: "",
    content: "",
    layout: DEFAULT_WORD_LAYOUT,
  });

  const calculateScale = (): void => {
    const containerWidth: number =
      containerRef.current?.clientWidth || window.innerWidth * 0.9;

    // Calculate the scale factor to fit the container width
    const newScale: number = Math.min(1, containerWidth / docData.layout.width);
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
  }, [docData.layout.width]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const htmlContent = html[mode];

    if (!htmlContent) {
      setDocData({
        styles: "",
        content: "",
        layout: DEFAULT_WORD_LAYOUT,
      });
      setError("No content found");
      setIsLoading(false);
      return;
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");

      const styleElements = doc.querySelectorAll("style");
      const styles = Array.from(styleElements)
        .map((style) => createScopedCss(style))
        .join("\n");

      const layout = parseDocxPageLayout(styles, DEFAULT_WORD_LAYOUT);

      const wordSection = doc.body.querySelector(".WordSection1");
      const content = wordSection ? wordSection.outerHTML : doc.body.innerHTML;

      const sanitizedContent = DOMPurify.sanitize(content);

      setDocData({
        styles,
        content: sanitizedContent,
        layout,
      });
    } catch (err) {
      console.error("Error parsing DOCX HTML", err);
      setError("Failed to parse document content");
      setDocData({
        styles: "",
        content: "",
        layout: DEFAULT_WORD_LAYOUT,
      });
    } finally {
      setIsLoading(false);
    }
  }, [html, mode]);

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
          showSideBySide={!!html.translation}
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
