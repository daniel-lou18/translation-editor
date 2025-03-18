import DocumentCardSkeleton from "@/components/ui/Card/DocumentCardSkeleton";
import DataHandler from "@/components/ui/DataHandler";
import ViewerSelector from "@/components/ui/DocViewer/ViewerSelector";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { getFileType } from "@/types/Files";

export default function DocumentViewer() {
  const { currentDocument, isLoading, isError, error } = useCurrentProject();
  const contentType = getFileType(currentDocument?.fileName);

  return (
    <DataHandler
      data={{ currentDocument, contentType }}
      loading={{ isLoading, component: <DocumentCardSkeleton /> }}
      error={{ isError, error }}
      empty={{ isEmpty: !currentDocument, component: <p>No document found</p> }}
    >
      {(data) => (
        <ViewerSelector
          document={data.currentDocument}
          contentType={data.contentType}
        />
      )}
    </DataHandler>
  );
}
