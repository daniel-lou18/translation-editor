import DocumentCardSkeleton from "@/components/ui/Card/DocumentCardSkeleton";
import Container from "@/components/ui/Container";
import DocViewerError from "@/components/ui/DocViewer/DocViewerError";
import ViewerSelector from "@/components/ui/DocViewer/ViewerSelector";
import NoContent from "@/components/ui/Error/NoFileContent";
import PageTitle from "@/components/ui/PageTitle";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { getFileType } from "@/types/Files";
import { A4_WIDTH } from "@/utils/constants";

export default function DocumentViewer() {
  const { currentDocument, isLoading, isError, error } = useCurrentProject();
  const contentType = getFileType(currentDocument?.fileName);

  if (isLoading) return <DocumentCardSkeleton />;

  if (isError)
    return (
      <DocViewerError
        error={error?.message || "Error Loading Document"}
        config={{ maxHeight: "80vh", scale: 1, width: A4_WIDTH }}
      />
    );

  if (!currentDocument) return <NoContent title="No Document Found" />;

  return (
    <Container className="space-y-8">
      <PageTitle title={currentDocument.fileName} />
      <ViewerSelector document={currentDocument} contentType={contentType} />
    </Container>
  );
}
