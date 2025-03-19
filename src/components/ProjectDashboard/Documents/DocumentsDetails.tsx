import DocumentCard from "@/components/ui/Card/DocumentCard";
import { useGetDocument } from "@/hooks/useGetDocument";
import { useRoute } from "@/hooks/useRoute";
import PageTitle from "@/components/ui/PageTitle";
import Container from "@/components/ui/Container";
import DocumentCardSkeleton from "@/components/ui/Card/DocumentCardSkeleton";
import Error from "@/components/ui/Error/FileError";
import NoContent from "@/components/ui/Error/NoFileContent";

export default function DocumentsDetails() {
  const { documentId } = useRoute();
  const { document, isLoading, isError, error } = useGetDocument(documentId);

  function renderDocumentCard() {
    if (isLoading) {
      return <DocumentCardSkeleton />;
    }
    if (isError) {
      return <Error title="Error Loading Document" error={error} />;
    }
    if (!document) {
      return <NoContent />;
    }

    return <DocumentCard document={document} />;
  }

  return (
    <Container className="space-y-8">
      <PageTitle title="Document details" />
      {renderDocumentCard()}
    </Container>
  );
}
