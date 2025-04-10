import { EditorActions, useEditorActions } from "@/hooks/useEditorActions";
import { useEditorSync } from "@/hooks/useEditorSync";
import { Segment } from "@/types/Segment";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { editorContextUtils, NextSegmentConfig } from "./editorContextUtils";
import { SegmentStatus } from "@/types";
import { useGetTranslationSegments } from "@/hooks/useGetTranslationSegments";
import { useRoute } from "@/hooks/useRoute";
import { useSaveSegments } from "@/hooks/useSaveSegments";

export type InitialState = {
  isInitialized: boolean;
  segments: Segment[];
  activeSegmentId: number;
  allSegmentsConfirmed: boolean;
  pendingChanges: Set<number>;
  lastChanged: number;
};

type EditorContextProviderProps = {
  children: ReactNode;
};

type Utilities = {
  getActiveSegment: () => Segment;
  toNextSegment: (config?: NextSegmentConfig) => Segment;
  getCompletedSegments: () => number;
};

type ContextValue = Omit<InitialState, "isInitialized"> &
  Utilities &
  EditorActions;

export type Action =
  | {
      type: "INITIALIZE_SEGMENTS";
      payload: Segment[];
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
  isInitialized: false,
  segments: [],
  activeSegmentId: -1,
  allSegmentsConfirmed: false,
  pendingChanges: new Set(),
  lastChanged: Date.now(),
};

const EditorContext = createContext<ContextValue | null>(null);

function reducer(state: InitialState, action: Action): InitialState {
  switch (action.type) {
    case "INITIALIZE_SEGMENTS":
      return {
        ...state,
        segments: action.payload,
        isInitialized: true,
        lastChanged: Date.now(),
      };
    case "RESET_INITIAL_STATE":
      return initialState;
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
        lastChanged: Date.now(),
      };
    case "RESET_ALL_SEGMENTS":
      return {
        ...state,
        segments: state.segments.map((segment) => ({
          ...segment,
          targetText: "",
        })),
        lastChanged: Date.now(),
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
        lastChanged: Date.now(),
      };
    case "SET_STATUS":
      return {
        ...state,
        segments: state.segments.map((segment) =>
          segment.id === action.payload.id
            ? { ...segment, status: action.payload.status }
            : segment
        ),
        lastChanged: Date.now(),
      };
    case "UPDATE_STATUS_ALL":
      return {
        ...state,
        segments: state.segments.map((segment) => ({
          ...segment,
          status: state.allSegmentsConfirmed ? "untranslated" : "translated",
        })),
        allSegmentsConfirmed: !state.allSegmentsConfirmed,
        lastChanged: Date.now(),
      };
    case "SYNC_COMPLETED":
      console.log("sync completed", Date.now());
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
}: EditorContextProviderProps) {
  const [
    {
      segments,
      activeSegmentId,
      allSegmentsConfirmed,
      pendingChanges,
      isInitialized,
      lastChanged,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const actions = useEditorActions(dispatch);
  const utils = editorContextUtils(segments, activeSegmentId, actions);

  const {
    segments: remoteSegments,
    isLoading,
    isError,
    error,
  } = useGetTranslationSegments();

  const { mutate } = useSaveSegments();

  const { translationId } = useRoute();

  useEffect(() => {
    if (!translationId) return;

    // Force a final sync before resetting
    if (pendingChanges.size > 0) {
      const changedSegments = segments.filter((segment) =>
        pendingChanges.has(segment.id)
      );
      mutate(changedSegments);
    }

    actions.resetInitialState();
  }, [translationId]);

  useEffect(() => {
    if (!isLoading && remoteSegments.length > 0 && !isInitialized) {
      actions.initializeSegments(remoteSegments);
    }
  }, [isLoading, remoteSegments, isInitialized]);

  useEditorSync(
    {
      segments,
      activeSegmentId,
      allSegmentsConfirmed,
      pendingChanges,
      lastChanged,
    },
    dispatch
  );

  return (
    <EditorContext.Provider
      value={{
        segments,
        activeSegmentId,
        allSegmentsConfirmed,
        pendingChanges,
        lastChanged,
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
