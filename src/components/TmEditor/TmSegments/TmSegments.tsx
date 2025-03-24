import { EditorSegment } from "@/components/ui/Editor/EditorSegment";
import { useTmSegments } from "@/hooks/useTmSegments";
import { formatTmSegmentsToEditorSegments } from "@/utils/helpers";
import ContentContainer from "@/components/ui/Editor/ContentContainer";
import FileError from "@/components/ui/Error/FileError";
import NoFileContent from "@/components/ui/Error/NoFileContent";
import TextEditorSkeleton from "@/components/TextEditor/TextEditorSkeleton";

export default function TmSegments() {
  const { tmSegments, isLoading, isError, error } = useTmSegments();
  const editorSegments = formatTmSegmentsToEditorSegments(tmSegments);

  function renderTmSegments() {
    if (isLoading) {
      return <TextEditorSkeleton />;
    }
    if (isError) {
      return <FileError title="Error Loading TM Segments" error={error} />;
    }
    if (!tmSegments) {
      return <NoFileContent />;
    }

    return editorSegments?.map((segment, idx) => (
      <EditorSegment
        key={segment.id}
        data={{ ...segment, activeId: idx, index: idx, placeholder: null }}
        handlers={{
          onChange: () => {},
          onClick: () => {},
          onStatusChange: () => {},
          onKeyDown: () => {},
        }}
      />
    ));
  }

  return <ContentContainer>{renderTmSegments()}</ContentContainer>;
}
