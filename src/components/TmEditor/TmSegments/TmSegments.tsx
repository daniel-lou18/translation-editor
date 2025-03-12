import { EditorSegment } from "@/components/ui/Editor/EditorSegment";
import { useTmSegments } from "@/hooks/useTmSegments";
import { formatTmSegmentsToEditorSegments } from "@/utils/helpers";
import ContentContainer from "@/components/ui/Editor/ContentContainer";

export default function TmSegments() {
  const { tmSegments } = useTmSegments();
  const editorSegments = formatTmSegmentsToEditorSegments(tmSegments);

  console.log({ editorSegments });

  return (
    <ContentContainer>
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
    </ContentContainer>
  );
}
