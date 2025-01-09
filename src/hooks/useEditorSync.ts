import {
  Action as EditorAction,
  InitialState as EditorState,
} from "@/contexts/editorContext";
import { Dispatch, useEffect, useRef } from "react";
import { useSaveSegments } from "./useSaveSegments";

export function useEditorSync(
  state: EditorState,
  dispatch: Dispatch<EditorAction>
) {
  const stateRef = useRef(state);
  const { mutate } = useSaveSegments();

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const syncChanges = () => {
      if (stateRef.current.pendingChanges.size === 0) return;

      const changedSegments = stateRef.current.segments.filter((segment) =>
        stateRef.current.pendingChanges.has(segment.id)
      );

      mutate(changedSegments, {
        onSuccess: () => dispatch({ type: "SYNC_COMPLETED" }),
      });
    };

    const intervalId = setInterval(syncChanges, 15000);

    return () => {
      syncChanges();
      clearInterval(intervalId);
    };
  }, [dispatch, mutate]);
}
