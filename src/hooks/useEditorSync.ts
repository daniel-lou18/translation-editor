import {
  Action as EditorAction,
  InitialState as EditorState,
} from "@/contexts/editorContext";
import { Dispatch, useCallback, useEffect } from "react";
import { useSaveSegments } from "./useSaveSegments";

export function useEditorSync(
  state: EditorState,
  dispatch: Dispatch<EditorAction>
) {
  const { mutate, savedSegmentIds } = useSaveSegments();

  const syncChanges = useCallback(() => {
    if (state.pendingChanges.size === 0) return;

    const changedSegments = state.segments.filter((segment) =>
      state.pendingChanges.has(segment.id)
    );

    mutate(changedSegments, {
      onSuccess: () => dispatch({ type: "SYNC_COMPLETED" }),
    });

    console.log(savedSegmentIds);
  }, [mutate, state.pendingChanges, state.segments, dispatch, savedSegmentIds]);

  useEffect(() => {
    const intervalId = setInterval(syncChanges, 30000);
    return () => clearInterval(intervalId);
  }, [syncChanges]);

  useEffect(() => {
    return () => syncChanges();
  }, [syncChanges]);
}
