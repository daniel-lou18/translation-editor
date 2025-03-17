import DocumentCard from "@/components/ui/Card/DocumentCard";
import { useGetDocument } from "@/hooks/useGetDocument";
import { useRoute } from "@/hooks/useRoute";
import DataHandler from "@/components/ui/DataHandler";
import DocumentCardSkeleton from "@/components/ui/Card/DocumentCardSkeleton";
import { FileText } from "lucide-react";
import PageTitle from "@/components/ui/PageTitle";
import Container from "@/components/ui/Container";

export default function DocumentsDetails() {
  const { documentId } = useRoute();
  const { document, isLoading, isError, error } = useGetDocument(documentId);

  return (
    <Container className="space-y-8">
      <PageTitle title="Document details" />
      <DataHandler
        data={document}
        loading={{
          isLoading,
          component: <DocumentCardSkeleton />,
        }}
        error={{
          isError,
          error,
        }}
        empty={{
          isEmpty: !document && !isLoading && !isError,
          component: <EmptyDocumentState />,
        }}
      >
        {(document) => <DocumentCard document={document} />}
      </DataHandler>
    </Container>
  );
}

function EmptyDocumentState() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">No Document Found</h3>
      <p className="text-muted-foreground mt-2">
        The document you're looking for doesn't exist or has been removed.
      </p>
    </div>
  );
}
