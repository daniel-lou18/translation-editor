import { Action as EditorAction, EditorData } from "@/contexts/editorContextV1";
import { SegmentStatus } from "@/types";
import { Dispatch, useCallback } from "react";

export type EditorActions = {
  initializeEditor: (editorData: EditorData) => void;
  handleSegmentChange: (id: number) => void;
  handleValueChange: (id: number, value: string | null) => void;
  handleStatusChange: (id: number) => void;
  setStatus: (id: number, status: SegmentStatus) => void;
  handleStatusChangeAll: () => void;
  handleResetAllSegments: () => void;
  resetInitialState: () => void;
};

export function useEditorActions(
  dispatch: Dispatch<EditorAction>
): EditorActions {
  return {
    initializeEditor: useCallback((editorData: EditorData) => {
      dispatch({ type: "INITIALIZE_EDITOR", payload: editorData });
    }, []),
    resetInitialState: useCallback(() => {
      dispatch({ type: "RESET_INITIAL_STATE" });
    }, []),
    handleSegmentChange: useCallback(
      (id: number) => dispatch({ type: "SET_ACTIVE_ID", payload: id }),
      [dispatch]
    ),
    handleValueChange: useCallback(
      (id: number, value: string | null) =>
        dispatch({ type: "UPDATE_SEGMENTS", payload: { id, value } }),
      [dispatch]
    ),
    handleResetAllSegments: useCallback(
      () => dispatch({ type: "RESET_ALL_SEGMENTS" }),
      [dispatch]
    ),
    handleStatusChange: useCallback(
      (id: number) => dispatch({ type: "UPDATE_STATUS", payload: id }),
      [dispatch]
    ),
    setStatus: useCallback(
      (id: number, status: SegmentStatus) =>
        dispatch({ type: "SET_STATUS", payload: { id, status } }),
      [dispatch]
    ),
    handleStatusChangeAll: useCallback(
      () => dispatch({ type: "UPDATE_STATUS_ALL" }),
      [dispatch]
    ),
  };
}
