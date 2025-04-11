import { EditorActions, useEditorActions } from "@/hooks/useEditorActions";
import { Segment } from "@/types/Segment";
import { createContext, ReactNode, useContext, useReducer } from "react";
import { editorContextUtils, NextSegmentConfig } from "./editorContextUtils";
import { SegmentStatus } from "@/types";
import { useGetTranslationSegments } from "@/hooks/useGetTranslationSegments";
import { Translation } from "@/types/Translation";
import { useInitializeEditor } from "@/hooks/useInitializeEditor";
import { useSaveEditorChanges } from "@/hooks/useSaveEditorChanges";

export type EditorData = {
  translation: Translation | null;
  segments: Segment[];
};

export type InitialState = {
  pendingChanges: Set<number>;
  activeSegmentId: number;
  allSegmentsConfirmed: boolean;
  isInitialized: boolean;
} & EditorData;

type EditorContextProviderProps = {
  children: ReactNode;
};

type Utilities = {
  getActiveSegment: () => Segment;
  toNextSegment: (config?: NextSegmentConfig) => Segment;
  getCompletedSegments: () => number;
};

type ContextValue = InitialState & {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} & Utilities &
  EditorActions;

export type Action =
  | {
      type: "INITIALIZE_EDITOR";
      payload: EditorData;
    }
  | {
      type: "SET_ACTIVE_ID";
      payload: number;
    }
  | {
      type: "UPDATE_SEGMENTS";
      payload: {
        id: number;
        value: string | null;
      };
    }
  | {
      type: "UPDATE_STATUS";
      payload: number;
    }
  | { type: "SET_STATUS"; payload: { id: number; status: SegmentStatus } }
  | { type: "UPDATE_STATUS_ALL" }
  | { type: "SYNC_COMPLETED" }
  | { type: "RESET_ALL_SEGMENTS" }
  | { type: "RESET_INITIAL_STATE" };

const initialState: InitialState = {
  translation: null,
  segments: [],
  pendingChanges: new Set(),
  activeSegmentId: -1,
  allSegmentsConfirmed: false,
  isInitialized: false,
};

const EditorContext = createContext<ContextValue | null>(null);

function reducer(state: InitialState, action: Action): InitialState {
  switch (action.type) {
    case "INITIALIZE_EDITOR":
      return {
        ...state,
        translation: action.payload.translation,
        segments: action.payload.segments,
        isInitialized: true,
      };
    case "RESET_INITIAL_STATE":
      return {
        ...initialState,
        translation: state.translation,
        segments: state.segments,
      };
    case "SET_ACTIVE_ID":
      return { ...state, activeSegmentId: action.payload };
    case "UPDATE_SEGMENTS": {
      const updatedSegments = [...state.segments];
      const segmentIdx = updatedSegments.findIndex(
        (segment) => segment.id === action.payload.id
      );

      if (segmentIdx === -1) return state;

      updatedSegments[segmentIdx] = {
        ...updatedSegments[segmentIdx],
        targetText: action.payload.value,
      };

      return {
        ...state,
        segments: updatedSegments,
        pendingChanges: new Set([...state.pendingChanges, action.payload.id]),
      };
    }
    case "UPDATE_STATUS": {
      const updatedSegments = [...state.segments];
      const segmentIdx = updatedSegments.findIndex(
        (segment) => segment.id === action.payload
      );

      if (segmentIdx === -1) return state;

      updatedSegments[segmentIdx] = {
        ...updatedSegments[segmentIdx],
        status:
          updatedSegments[segmentIdx].status === "untranslated"
            ? "translated"
            : "untranslated",
      };

      return {
        ...state,
        segments: updatedSegments,
        pendingChanges: new Set([...state.pendingChanges, action.payload]),
      };
    }
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
      console.log("sync completed", Date.now());
      return {
        ...state,
        pendingChanges: new Set(),
      };
    default:
      throw new Error(`Unhandled action type`);
    case "RESET_ALL_SEGMENTS":
      return {
        ...state,
        segments: state.segments.map((segment) => ({
          ...segment,
          targetText: "",
        })),
      };
  }
}

export default function EditorContextProvider({
  children,
}: EditorContextProviderProps) {
  const [
    {
      segments,
      translation,
      activeSegmentId,
      allSegmentsConfirmed,
      pendingChanges,
      isInitialized,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const actions = useEditorActions(dispatch);
  const utils = editorContextUtils(segments, activeSegmentId, actions);

  const {
    segments: remoteSegments,
    translation: remoteTranslation,
    isLoading,
    isError,
    error,
  } = useGetTranslationSegments();

  useInitializeEditor(
    { translation: remoteTranslation, segments: remoteSegments },
    isLoading,
    isInitialized,
    actions.initializeEditor
  );
  useSaveEditorChanges(translation?.id, segments, pendingChanges);

  return (
    <EditorContext.Provider
      value={{
        translation,
        segments,
        activeSegmentId,
        allSegmentsConfirmed,
        pendingChanges,
        isInitialized,
        isLoading,
        isError,
        error,
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
