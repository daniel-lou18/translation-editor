import Container from "@/components/ui/Container";
import { useRef, useEffect, useState } from "react";
import ViewerControls from "./ViewerControls";
import { Html } from "./HtmlViewer";
import DOMPurify from "dompurify";
import ErrorMessage from "../Error/ErrorMessage";
export type Mode = "original" | "translation";

type DocxViewerProps = {
  html: Html;
  initialScale?: number;
  maxHeight?: string;
  onScaleChange?: (scale: number) => void;
};

type WordLayout = {
  width: number;
  minHeight: number;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
};

const DEFAULT_WORD_LAYOUT: WordLayout = {
  width: 792,
  minHeight: 1120,
  paddingTop: 96,
  paddingBottom: 96,
  paddingLeft: 96,
  paddingRight: 96,
};

const convertPtToPx = (pt: number) => pt * (96 / 72);

const parsePageLayout = (
  cssText: string,
  defaultLayout: WordLayout
): WordLayout => {
  const pageRuleRegex =
    /@page\s+WordSection1\s*\{\s*size:\s*([\d.]+pt)\s+([\d.]+pt);\s*margin:\s*([\d.]+pt)\s+([\d.]+pt)\s+([\d.]+pt)\s+([\d.]+pt);\s*\}/i; // Make selector specific if needed
  const match = cssText.match(pageRuleRegex);

  if (match) {
    return {
      width: convertPtToPx(parseFloat(match[1])),
      minHeight: convertPtToPx(parseFloat(match[2])),
      paddingTop: convertPtToPx(parseFloat(match[3])),
      paddingBottom: convertPtToPx(parseFloat(match[4])),
      paddingLeft: convertPtToPx(parseFloat(match[5])),
      paddingRight: convertPtToPx(parseFloat(match[6])),
    };
  }
  return defaultLayout;
};

export default function DocxViewer({
  html,
  initialScale = 1,
  maxHeight = "80vh",
  onScaleChange,
}: DocxViewerProps) {
  const [error, setError] = useState<string | null>(null);
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
    const htmlContent = html[mode];

    if (!htmlContent) {
      setDocData({
        styles: "",
        content: "",
        layout: DEFAULT_WORD_LAYOUT,
      });
      setError("No content found");
      return;
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");

      const styleElements = doc.querySelectorAll("style");
      const styles = Array.from(styleElements)
        .map((style) => style.innerHTML)
        .join("\n");

      const layout = parsePageLayout(styles, DEFAULT_WORD_LAYOUT);

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

      <div
        ref={containerRef}
        className="flex justify-center px-12 py-8 border border-border bg-white overflow-auto rounded-sm"
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
    </Container>
  );
}
