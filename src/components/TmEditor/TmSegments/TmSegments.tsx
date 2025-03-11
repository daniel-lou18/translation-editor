import { EditorSegment } from "@/components/ui/Editor/EditorSegment";
import Container from "@/components/ui/Container";
import { useTmSegments } from "@/hooks/useTmSegments";
import { formatTmSegmentsToEditorSegments } from "@/utils/helpers";

export default function TmSegments() {
  const { tmSegments } = useTmSegments();
  const editorSegments = formatTmSegmentsToEditorSegments(tmSegments);

  console.log({ editorSegments });

  return (
    <Container className="col-span-9 bg-background shadow-sm divide-y divide-gray-100 border-r border-muted">
      {editorSegments?.map((segment, idx) => (
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
      ))}
    </Container>
  );
}
