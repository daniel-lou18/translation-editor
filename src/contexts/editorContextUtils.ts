import { EditorActions } from "@/hooks/useEditorActions";
import { Segment } from "@/types/Segment";

export type NextSegmentConfig = {
  direction: "forward" | "backward";
  skipConfirmed: boolean;
};

export function editorContextUtils(
  segments: Segment[],
  activeSegmentId: number,
  actions: EditorActions
) {
  const getActiveSegment = () =>
    segments.find((segment) => segment.id === activeSegmentId) || segments[0];

  const toNextSegment = (
    config: NextSegmentConfig = {
      direction: "forward",
      skipConfirmed: false,
    }
  ) => {
    const currentIndex = segments.findIndex(
      (segment) => segment.id === activeSegmentId
    );

    const firstUnconfirmedSegment = segments
      .slice(currentIndex + 1)
      .find((segment) => segment.status !== "translated");

    const nextSegment = config.skipConfirmed
      ? firstUnconfirmedSegment
      : segments[currentIndex + 1];

    if (!nextSegment) return segments[currentIndex];

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
