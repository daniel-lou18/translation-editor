import DocumentCard from "@/components/ui/Card/DocumentCard";
import { useGetDocument } from "@/hooks/useGetDocument";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";

export default function DocumentsDetails() {
  const { documentId } = useTranslationRoute();
  const { document } = useGetDocument(documentId);

  if (!document) {
    return <div>No document found</div>;
  }

  return <DocumentCard document={document} />;
}
