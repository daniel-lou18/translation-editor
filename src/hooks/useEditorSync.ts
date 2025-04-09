import {
  Action as EditorAction,
  InitialState as EditorState,
} from "@/contexts/editorContextV1";
import { Dispatch, useEffect, useRef } from "react";
import { useSaveSegments } from "./useSaveSegments";

export function useEditorSync(
  state: Omit<EditorState, "isInitialized">,
  dispatch: Dispatch<EditorAction>
) {
  const stateRef = useRef(state);
  const { mutate, isLoading } = useSaveSegments();

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
        onSuccess: () => {
          dispatch({ type: "SYNC_COMPLETED" });
        },
      });
    };

    const intervalId = setInterval(syncChanges, 750);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, mutate, isLoading]);
}
