import {
  Action as EditorAction,
  InitialState as EditorState,
} from "@/contexts/editorContextV1";
import { Dispatch, useEffect, useMemo, useRef } from "react";
import { useSaveSegments } from "./useSaveSegments";
import { createDebouncedFunction } from "@/utils/helpers";
import { Segment } from "@/types/Segment";

export function useEditorSync(
  state: EditorState,
  dispatch: Dispatch<EditorAction>
) {
  const stateRef = useRef(state);
  const { mutate } = useSaveSegments();

  const pendingChangesKey = useMemo(
    () => [...state.pendingChanges].sort().join(","),
    [state.pendingChanges]
  );

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const debouncedMutateRef = useRef(
    createDebouncedFunction((changedSegments: Segment[]) => {
      if (!stateRef.current.translation) return;
      mutate(
        {
          translationId: stateRef.current.translation.id,
          segmentUpdates: changedSegments,
        },
        {
          onSuccess: () => {
            dispatch({ type: "SYNC_COMPLETED" });
          },
        }
      );
    }, 1500)
  );

  useEffect(() => {
    if (!stateRef.current.isInitialized) return;
    if (stateRef.current.pendingChanges.size === 0) return;
    if (stateRef.current.segments.length === 0) return; // Don't sync during reset

    const changedSegments = stateRef.current.segments.filter((segment) =>
      stateRef.current.pendingChanges.has(segment.id)
    );

    debouncedMutateRef.current(changedSegments);
  }, [pendingChangesKey]);

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
