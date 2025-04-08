import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";

export type InitialState = {
  activeSegmentId: number;
  allSegmentsConfirmed: boolean;
};

type EditorContextProviderProps = {
  children: ReactNode;
};

type ContextValue = InitialState & Actions;

export type Action = {
  type: "SET_ACTIVE_ID";
  payload: number;
};

type Actions = {
  setActiveId: (id: number) => void;
};

const initialState: InitialState = {
  activeSegmentId: -1,
  allSegmentsConfirmed: false,
};

const EditorContext = createContext<ContextValue | null>(null);

function reducer(state: InitialState, action: Action): InitialState {
  switch (action.type) {
    case "SET_ACTIVE_ID":
      return { ...state, activeSegmentId: action.payload };
    default:
      throw new Error(`Unhandled action type`);
  }
}

export default function EditorContextProvider({
  children,
}: EditorContextProviderProps) {
  const [{ activeSegmentId, allSegmentsConfirmed }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const actions = useMemo(() => {
    return {
      setActiveId: (id: number) =>
        dispatch({ type: "SET_ACTIVE_ID", payload: id }),
    };
  }, [dispatch]);

  return (
    <EditorContext.Provider
      value={{
        activeSegmentId,
        allSegmentsConfirmed,
        ...actions,
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
