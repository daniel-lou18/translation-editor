import { EditorActions, useEditorActions } from "@/hooks/useEditorActions";
import { useEditorSync } from "@/hooks/useEditorSync";
import { SegmentWithTranslation } from "@/types";
import { createContext, ReactNode, useContext, useReducer } from "react";

export type InitialState = {
  segments: SegmentWithTranslation[];
  activeSegmentId: number;
  allSegmentsConfirmed: boolean;
  pendingChanges: Set<number>;
};

type EditorContextProviderProps = {
  children: ReactNode;
  initialSegments: SegmentWithTranslation[];
};

type Handlers = {
  getActiveSegment: () => SegmentWithTranslation;
  getCompletedSegments: () => number;
};

type ContextValue = InitialState & Handlers & EditorActions;

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

  const handlers = {
    getActiveSegment: () =>
      segments.find((segment) => segment.id === activeSegmentId) || segments[0],
    getCompletedSegments: () =>
      segments.reduce((acc, segment) => {
        if (segment.status === "translated") return acc + 1;
        else return acc;
      }, 0),
  };

  return (
    <EditorContext.Provider
      value={{
        segments,
        activeSegmentId,
        allSegmentsConfirmed,
        pendingChanges,
        ...actions,
        ...handlers,
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
