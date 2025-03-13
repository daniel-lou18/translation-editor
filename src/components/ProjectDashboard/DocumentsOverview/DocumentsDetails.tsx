import DocumentCard from "@/components/ui/Card/DocumentCard";
import { useCurrentProject } from "@/hooks/useCurrentProject";

export default function DocumentsDetails() {
  const { currentDocument } = useCurrentProject();

  if (!currentDocument) {
    return <div>No document found</div>;
  }

  return <DocumentCard document={currentDocument} />;
}
