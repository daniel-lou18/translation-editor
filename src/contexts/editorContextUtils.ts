import { EditorActions } from "@/hooks/useEditorActions";
import { Segment } from "@/types/Segment";

export function editorContextUtils(
  segments: Segment[],
  activeSegmentId: number,
  actions: EditorActions
) {
  const getActiveSegment = () =>
    segments.find((segment) => segment.id === activeSegmentId) || segments[0];

  const toNextSegment = () => {
    const currentIndex = segments.findIndex(
      (segment) => segment.id === activeSegmentId
    );
    const nextSegment = segments[currentIndex + 1];

    actions.handleSegmentChange(nextSegment.id);
    return nextSegment;
  };

  const getCompletedSegments = () =>
    segments.reduce((acc, segment) => {
      if (segment.status === "translated") return acc + 1;
      else return acc;
    }, 0);

  return { getActiveSegment, toNextSegment, getCompletedSegments };
}
