import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { Segment } from "@/types/Segment";
import { Translation } from "@/types/Translation";
import { useGetTranslationSegments } from "@/hooks/useGetTranslationSegments";
import { useInitializeEditor } from "@/hooks/useInitializeEditor"; // Assuming this hook is still relevant for loading initial data

// --- Simplified State ---
export type EditorV2Data = {
  translation: Translation | null;
  segments: Segment[]; // Read-only initial list
};

export type InitialStateV2 = {
  activeSegmentId: number; // For focus tracking
  isInitialized: boolean;
} & EditorV2Data;

// --- Simplified Actions ---
export type ActionV2 =
  | {
      type: "INITIALIZE_EDITOR";
      payload: EditorV2Data;
    }
  | {
      type: "SET_ACTIVE_ID";
      payload: number;
    };

const initialStateV2: InitialStateV2 = {
  translation: null,
  segments: [],
  activeSegmentId: -1,
  isInitialized: false,
};

// --- Simplified Reducer ---
function reducerV2(state: InitialStateV2, action: ActionV2): InitialStateV2 {
  switch (action.type) {
    case "INITIALIZE_EDITOR":
      // Reset state and load new data
      return {
        ...initialStateV2, // Start fresh
        translation: action.payload.translation,
        segments: action.payload.segments,
        isInitialized: true,
        // Optionally set initial focus to the first segment
        activeSegmentId: action.payload.segments[0]?.id ?? -1,
      };
    case "SET_ACTIVE_ID":
      return { ...state, activeSegmentId: action.payload };
    default:
      // Ensures type safety if new actions are added without handling
      // If no other actions are planned, `return state;` might suffice.
      throw new Error(`Unhandled action type in EditorContextV2`);
  }
}

// --- Simplified Actions Hook ---
// We can simplify this significantly or inline dispatch calls
type EditorActionsV2 = {
  setActiveSegmentId: (id: number) => void;
  initializeEditor: (data: EditorV2Data) => void;
};

function useEditorActionsV2(dispatch: Dispatch<ActionV2>): EditorActionsV2 {
  return useMemo(
    () => ({
      setActiveSegmentId: (id: number) =>
        dispatch({ type: "SET_ACTIVE_ID", payload: id }),
      initializeEditor: (data: EditorV2Data) =>
        dispatch({ type: "INITIALIZE_EDITOR", payload: data }),
    }),
    [dispatch]
  );
}

// --- Simplified Utilities ---
// Keep only what's necessary
type UtilitiesV2 = {
  getActiveSegment: () => Segment | undefined; // Make it optional
};

function editorContextUtilsV2(
  segments: Segment[],
  activeSegmentId: number
): UtilitiesV2 {
  const getActiveSegment = (): Segment | undefined => {
    if (activeSegmentId === -1) return undefined;
    return segments.find((segment) => segment.id === activeSegmentId);
  };

  // Memoize utilities to prevent unnecessary context updates if functions are stable
  return useMemo(() => ({ getActiveSegment }), [segments, activeSegmentId]);
}

// --- Simplified Context Value ---
type ContextValueV2 = InitialStateV2 & {
  isLoading: boolean; // Still useful from data fetching
  isError: boolean;
  error: Error | null;
} & UtilitiesV2 &
  EditorActionsV2;

const EditorContextV2 = createContext<ContextValueV2 | null>(null);

// --- Simplified Provider ---
type EditorContextProviderV2Props = {
  children: ReactNode;
};

export function EditorContextProviderV2({
  children,
}: EditorContextProviderV2Props) {
  const [{ segments, translation, activeSegmentId, isInitialized }, dispatch] =
    useReducer(reducerV2, initialStateV2);

  const actions = useEditorActionsV2(dispatch);
  const utils = editorContextUtilsV2(segments, activeSegmentId);

  // Fetch initial data
  const {
    segments: remoteSegments,
    translation: remoteTranslation,
    isLoading,
    isError,
    error,
  } = useGetTranslationSegments();

  // Initialize or update editor when remote data changes
  // (useInitializeEditor might need adjustment or simplification)
  useInitializeEditor(
    { translation: remoteTranslation, segments: remoteSegments },
    isLoading,
    isInitialized,
    actions.initializeEditor
  );

  // NOTE: useSaveEditorChanges is REMOVED as saving is now per-segment

  const contextValue = useMemo(
    () => ({
      translation,
      segments,
      activeSegmentId,
      isInitialized,
      isLoading,
      isError,
      error,
      ...actions,
      ...utils,
    }),
    [
      translation,
      segments,
      activeSegmentId,
      isInitialized,
      isLoading,
      isError,
      error,
      actions,
      utils,
    ]
  );

  return (
    <EditorContextV2.Provider value={contextValue}>
      {children}
    </EditorContextV2.Provider>
  );
}

// --- Simplified Consumer Hook ---
export function useEditorV2() {
  const context = useContext(EditorContextV2);

  if (!context) {
    throw new Error(
      "useEditorV2 must be used within the EditorContextV2 provider"
    );
  }

  return context;
}
