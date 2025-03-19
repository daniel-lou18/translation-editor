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

  const docUrl = `${import.meta.env.VITE_UPLOADS_URL}/${document.fileName}`;

  switch (contentType) {
    case "html":
    case "word":
      return <HtmlViewer html={document.html ?? ""} />;
    case "pdf":
      return <PDFViewer pdfUrl={docUrl} />;
    case "image":
      return <ImageViewer imageUrl={docUrl} />;
    default:
      return <p>Unsupported file type</p>;
  }
}
