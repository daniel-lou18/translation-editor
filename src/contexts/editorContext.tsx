import { DocumentSegment } from "@/types";
import { documentSegments } from "@/utils/sampleData";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useReducer,
} from "react";

type InitialState = {
  segments: DocumentSegment[];
  activeSegmentId: number;
};

type Handlers = {
  handleSegmentChange: (id: number) => void;
  handleValueChange: (id: number, value: string) => void;
  handleStatusChange: (id: number) => void;
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
    };

const initialState = {
  segments: documentSegments,
  activeSegmentId: 1,
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
            ? { ...segment, target: action.payload.value }
            : segment
        ),
      };
    case "UPDATE_STATUS":
      return {
        ...state,
        segments: state.segments.map((segment) =>
          segment.id === action.payload
            ? { ...segment, completed: !segment.completed }
            : segment
        ),
      };
    default:
      throw new Error(`Unhandled action type`);
  }
}

export default function EditorContextProvider({ children }: PropsWithChildren) {
  const [{ segments, activeSegmentId }, dispatch] = useReducer(
    reducer,
    initialState
  );

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
  };

  return (
    <EditorContext.Provider
      value={{
        segments,
        activeSegmentId,
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
