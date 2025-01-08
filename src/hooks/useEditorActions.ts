import { Action as EditorAction } from "@/contexts/editorContext";
import { Dispatch, useCallback } from "react";

export type EditorActions = {
  handleSegmentChange: (id: number) => void;
  handleValueChange: (id: number, value: string) => void;
  handleStatusChange: (id: number) => void;
  handleStatusChangeAll: () => void;
};

export function useEditorActions(
  dispatch: Dispatch<EditorAction>
): EditorActions {
  return {
    handleSegmentChange: useCallback(
      (id: number) => dispatch({ type: "SET_ACTIVE_ID", payload: id }),
      [dispatch]
    ),
    handleValueChange: useCallback(
      (id: number, value: string) =>
        dispatch({ type: "UPDATE_SEGMENTS", payload: { id, value } }),
      [dispatch]
    ),
    handleStatusChange: useCallback(
      (id: number) => dispatch({ type: "UPDATE_STATUS", payload: id }),
      [dispatch]
    ),
    handleStatusChangeAll: useCallback(
      () => dispatch({ type: "UPDATE_STATUS_ALL" }),
      [dispatch]
    ),
  };
}
