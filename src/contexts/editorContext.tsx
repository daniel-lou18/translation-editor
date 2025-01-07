import { Segment } from "@/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from "react";

type InitialState = {
  segments: Segment[];
  activeSegmentId: number;
  allSegmentsConfirmed: boolean;
};

type EditorContextProviderProps = {
  children: ReactNode;
  initialSegments: Segment[];
};

type Handlers = {
  handleSegmentChange: (id: number) => void;
  handleValueChange: (id: number, value: string) => void;
  handleStatusChange: (id: number) => void;
  handleStatusChangeAll: () => void;
  getActiveSegment: () => Segment;
  getCompletedSegments: () => number;
};

type ContextValue = InitialState & Handlers;

type Action =
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
  | { type: "UPDATE_STATUS_ALL" };

const initialState: InitialState = {
  segments: [],
  activeSegmentId: 1,
  allSegmentsConfirmed: false,
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
      };
    case "UPDATE_STATUS":
      return {
        ...state,
        segments: state.segments.map((segment) =>
          segment.id === action.payload
            ? { ...segment, completed: !segment.status }
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
    default:
      throw new Error(`Unhandled action type`);
  }
}

export default function EditorContextProvider({
  children,
  initialSegments = [],
}: EditorContextProviderProps) {
  const [{ segments, activeSegmentId, allSegmentsConfirmed }, dispatch] =
    useReducer(reducer, { ...initialState, segments: initialSegments });

  const handlers = {
    handleSegmentChange: useCallback(
      (id: number) => dispatch({ type: "SET_ACTIVE_ID", payload: id }),
      []
    ),
    handleValueChange: useCallback(
      (id: number, value: string) =>
        dispatch({ type: "UPDATE_SEGMENTS", payload: { id, value } }),
      []
    ),
    handleStatusChange: useCallback(
      (id: number) => dispatch({ type: "UPDATE_STATUS", payload: id }),
      []
    ),
    handleStatusChangeAll: useCallback(
      () => dispatch({ type: "UPDATE_STATUS_ALL" }),
      []
    ),

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
