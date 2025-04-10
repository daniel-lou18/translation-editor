import {
  Action as EditorAction,
  InitialState as EditorState,
} from "@/contexts/editorContextV1";
import { Dispatch, useEffect, useRef } from "react";
import { useSaveSegments } from "./useSaveSegments";
import { createDebouncedFunction } from "@/utils/helpers";
import { Segment } from "@/types/Segment";

export function useEditorSync(
  state: Omit<EditorState, "isInitialized">,
  dispatch: Dispatch<EditorAction>
) {
  const stateRef = useRef(state);
  const { mutate } = useSaveSegments();

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const debouncedMutateRef = useRef(
    createDebouncedFunction((changedSegments: Segment[]) => {
      mutate(changedSegments, {
        onSuccess: () => {
          dispatch({ type: "SYNC_COMPLETED" });
        },
      });
    }, 750)
  );

  useEffect(() => {
    if (stateRef.current.pendingChanges.size === 0) return;
    if (stateRef.current.segments.length === 0) return; // Don't sync during reset

    const changedSegments = stateRef.current.segments.filter((segment) =>
      stateRef.current.pendingChanges.has(segment.id)
    );

    debouncedMutateRef.current(changedSegments);
  }, [state.lastChanged]);

  // useEffect(() => {
  //   const syncChanges = () => {
  //     if (stateRef.current.pendingChanges.size === 0) return;
  //     if (stateRef.current.segments.length === 0) return; // Don't sync during reset

  //     const changedSegments = stateRef.current.segments.filter((segment) =>
  //       stateRef.current.pendingChanges.has(segment.id)
  //     );

  //     mutate(changedSegments, {
  //       onSuccess: () => {
  //         dispatch({ type: "SYNC_COMPLETED" });
  //       },
  //     });
  //   };

  //   const intervalId = setInterval(syncChanges, 750);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [dispatch, mutate, isLoading]);
}
