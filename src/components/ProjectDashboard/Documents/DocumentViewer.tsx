import DocumentCardSkeleton from "@/components/ui/Card/DocumentCardSkeleton";
import ViewerSelector from "@/components/ui/DocViewer/ViewerSelector";
import Error from "@/components/ui/Error/FileError";
import NoContent from "@/components/ui/Error/NoFileContent";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { getFileType } from "@/types/Files";

export default function DocumentViewer() {
  const { currentDocument, isLoading, isError, error } = useCurrentProject();
  const contentType = getFileType(currentDocument?.fileName);

  if (isLoading) return <DocumentCardSkeleton />;

  if (isError) return <Error title="Error Loading Document" error={error} />;

  if (!currentDocument) return <NoContent title="No Document Found" />;

  return (
    <ViewerSelector document={currentDocument} contentType={contentType} />
  );
}
