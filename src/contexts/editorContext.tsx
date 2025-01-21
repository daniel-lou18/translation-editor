import { EditorActions, useEditorActions } from "@/hooks/useEditorActions";
import { useEditorSync } from "@/hooks/useEditorSync";
import { Segment } from "@/types/Segment";
import { createContext, ReactNode, useContext, useReducer } from "react";
import { editorContextUtils } from "./editorContextUtils";
import { SegmentStatus } from "@/types";

export type InitialState = {
  segments: Segment[];
  activeSegmentId: number;
  allSegmentsConfirmed: boolean;
  pendingChanges: Set<number>;
};

type EditorContextProviderProps = {
  children: ReactNode;
  initialSegments: Segment[];
};

type Utilities = {
  getActiveSegment: () => Segment;
  toNextSegment: () => Segment;
  getCompletedSegments: () => number;
};

type ContextValue = InitialState & Utilities & EditorActions;

export type Action =
  | {
      type: "SET_ACTIVE_ID";
      payload: number;
    }
  | {
      type: "UPDATE_SEGMENTS";
      payload: {
        id: number;
        value: string;
      };
    }
  | {
      type: "UPDATE_STATUS";
      payload: number;
    }
  | { type: "SET_STATUS"; payload: { id: number; status: SegmentStatus } }
  | { type: "UPDATE_STATUS_ALL" }
  | { type: "SYNC_COMPLETED" };

const initialState: InitialState = {
  segments: [],
  activeSegmentId: 1,
  allSegmentsConfirmed: false,
  pendingChanges: new Set(),
};

const EditorContext = createContext<ContextValue | null>(null);

function reducer(state: InitialState, action: Action): InitialState {
  switch (action.type) {
    case "SET_ACTIVE_ID":
      return { ...state, activeSegmentId: action.payload };
    case "UPDATE_SEGMENTS":
      return {
        ...state,
        segments: state.segments.map((segment) =>
          segment.id === action.payload.id
            ? { ...segment, targetText: action.payload.value }
            : segment
        ),
        pendingChanges: state.pendingChanges.add(action.payload.id),
      };
    case "UPDATE_STATUS":
      return {
        ...state,
        segments: state.segments.map((segment) =>
          segment.id === action.payload
            ? {
                ...segment,
                status:
                  segment.status === "untranslated"
                    ? "translated"
                    : "untranslated",
              }
            : segment
        ),
        pendingChanges: state.pendingChanges.add(action.payload),
      };
    case "SET_STATUS":
      return {
        ...state,
        segments: state.segments.map((segment) =>
          segment.id === action.payload.id
            ? { ...segment, status: action.payload.status }
            : segment
        ),
      };
    case "UPDATE_STATUS_ALL":
      return {
        ...state,
        segments: state.segments.map((segment) => ({
          ...segment,
          status: state.allSegmentsConfirmed ? "untranslated" : "translated",
        })),
        allSegmentsConfirmed: !state.allSegmentsConfirmed,
      };
    case "SYNC_COMPLETED":
      return {
        ...state,
        pendingChanges: new Set(),
      };
    default:
      throw new Error(`Unhandled action type`);
  }
}

export default function EditorContextProvider({
  children,
  initialSegments = [],
}: EditorContextProviderProps) {
  const [
    { segments, activeSegmentId, allSegmentsConfirmed, pendingChanges },
    dispatch,
  ] = useReducer(reducer, { ...initialState, segments: initialSegments });

  const actions = useEditorActions(dispatch);
  useEditorSync(
    { segments, activeSegmentId, allSegmentsConfirmed, pendingChanges },
    dispatch
  );
  const utils = editorContextUtils(segments, activeSegmentId, actions);

  return (
    <EditorContext.Provider
      value={{
        segments,
        activeSegmentId,
        allSegmentsConfirmed,
        pendingChanges,
        ...actions,
        ...utils,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("useEditor must be used within the EditorContext provider");
  }

  return context;
}
