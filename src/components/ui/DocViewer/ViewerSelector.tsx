import ImageViewer from "./ImageViewer";
import HtmlViewer from "./HtmlViewer";
import PDFViewer from "./PDFViewer";
import { Document } from "@/types";

type ViewerSelectorProps = {
  document: Document | null;
  contentType: string | null;
};

export default function ViewerSelector({
  document,
  contentType,
}: ViewerSelectorProps) {
  if (!document) return null;

  switch (contentType) {
    case "html":
    case "word":
      return (
        <HtmlViewer
          html={{ original: document.html ?? "Content not available" }}
        />
      );
    case "pdf":
      return <PDFViewer pdfUrl={document.fileUrl ?? "Content not available"} />;
    case "image":
      return (
        <ImageViewer imageUrl={document.fileUrl ?? "Content not available"} />
      );
    default:
      return <p>Unsupported file type</p>;
  }
}
