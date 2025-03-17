import { useMemo } from "react";
import HtmlViewer from "./HtmlViewer";
import ImageViewer from "./ImageViewer";
import PDFViewer from "./PDFViewer";
import { allowedImageTypes, allowedPdfTypes } from "@/types/Files";

interface ContentViewerProps {
  content: string;
  contentType?: "html" | "image" | "pdf" | "auto";
  initialScale?: number;
  maxHeight?: string;
  onScaleChange?: (scale: number) => void;
  alt?: string;
  title?: string;
}

export default function ContentViewer({
  content,
  contentType = "auto",
  initialScale = 1,
  maxHeight = "80vh",
  onScaleChange,
  alt = "Content preview",
  title = "Document preview",
}: ContentViewerProps) {
  // Determine content type if set to auto
  const determinedContentType = useMemo(() => {
    if (contentType !== "auto") return contentType;

    // Check if content is likely an image URL
    const imageExtensions = allowedImageTypes.map((ext: string) =>
      ext.substring(1)
    ); // Remove the dot
    const imageRegex = new RegExp(
      `\\.(${imageExtensions.join("|")})(\?.*)?$`,
      "i"
    );
    const isImageUrl =
      imageRegex.test(content) || content.startsWith("data:image/");

    // Check if content is likely a PDF URL
    const pdfExtensions = allowedPdfTypes.map((ext: string) =>
      ext.substring(1)
    ); // Remove the dot
    const pdfRegex = new RegExp(`\\.(${pdfExtensions.join("|")})(\?.*)?$`, "i");
    const isPdfUrl = pdfRegex.test(content);

    if (isPdfUrl) return "pdf";
    if (isImageUrl) return "image";
    return "html";
  }, [content, contentType]);

  // Render the appropriate viewer based on content type
  switch (determinedContentType) {
    case "image":
      return (
        <ImageViewer
          imageUrl={content}
          initialScale={initialScale}
          maxHeight={maxHeight}
          onScaleChange={onScaleChange}
          alt={alt}
        />
      );
    case "pdf":
      return (
        <PDFViewer
          pdfUrl={content}
          initialScale={initialScale}
          maxHeight={maxHeight}
          onScaleChange={onScaleChange}
          title={title}
        />
      );
    default:
      // Default to HTML preview
      return (
        <HtmlViewer
          html={content}
          initialScale={initialScale}
          maxHeight={maxHeight}
          onScaleChange={onScaleChange}
        />
      );
  }
}
