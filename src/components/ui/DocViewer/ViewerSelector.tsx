import ImageViewer from "./ImageViewer";
import HtmlViewer from "./HtmlViewer";
import PDFViewer from "./PDFViewer";
import { Document } from "@/types";
import DocxViewer from "./DocxViewer";

type ViewerSelectorProps = {
  document: Document | null;
  contentType: string | null;
};

export default function ViewerSelector({
  document,
  contentType,
}: ViewerSelectorProps) {
  if (!document) return null;

  console.log(document);

  switch (contentType) {
    case "html":
      return (
        <HtmlViewer
          html={{ original: document.html ?? "Content not available" }}
        />
      );
    case "word":
      return (
        <DocxViewer
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
