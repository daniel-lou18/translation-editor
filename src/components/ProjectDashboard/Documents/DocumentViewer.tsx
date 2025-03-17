import HtmlViewer from "@/components/ui/DocViewer/HtmlViewer";
import ImageViewer from "@/components/ui/DocViewer/ImageViewer";
import PDFViewer from "@/components/ui/DocViewer/PDFViewer";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { getFileType } from "@/types/Files";

export default function DocumentViewer() {
  const { currentDocument } = useCurrentProject();
  const docUrl = `${import.meta.env.VITE_UPLOADS_URL}/${
    currentDocument?.fileName
  }`;

  if (!currentDocument) return null;

  const contentType = getFileType(currentDocument.fileName);

  switch (contentType) {
    case "html":
      return <HtmlViewer html={currentDocument.html} />;
    case "pdf":
      return <PDFViewer pdfUrl={docUrl} />;
    case "image":
      return <ImageViewer imageUrl={docUrl} />;
    default:
      return <p>Unsupported file type</p>;
  }
}
