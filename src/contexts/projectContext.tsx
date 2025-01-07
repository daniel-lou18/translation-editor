import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useReducer,
} from "react";

type InitialState = {
  projectName: string;
  projectId: number | string;
  fileName: string;
  fileId: number | string;
  sourceLang: string;
  targetLang: string;
};

type Handlers = {
  updateSourceLang: (sourceLang: string) => void;
  updateTargetLang: (targetLang: string) => void;
};

type ContextValue = InitialState & Handlers;

type Action =
  | {
      type: "UPDATE_SOURCE_LANG";
      payload: string;
    }
  | { type: "UPDATE_TARGET_LANG"; payload: string };

const initialState: InitialState = {
  projectName: "Default project",
  projectId: "",
  fileName: "verklaring_van_erfrecht.txt",
  fileId: "",
  sourceLang: "",
  targetLang: "",
};

const ProjectContext = createContext<ContextValue | null>(null);

function reducer(state: InitialState, action: Action): InitialState {
  switch (action.type) {
    case "UPDATE_SOURCE_LANG":
      return { ...state, sourceLang: action.payload };
    case "UPDATE_TARGET_LANG":
      return { ...state, targetLang: action.payload };
    default:
      throw new Error(`Unhandled action type`);
  }
}

export default function ProjectContextProvider({
  children,
}: PropsWithChildren) {
  const [
    { projectName, projectId, sourceLang, targetLang, fileName, fileId },
    dispatch,
  ] = useReducer(reducer, initialState);

  const handlers = {
    updateSourceLang: useCallback(
      (sourceLang: string) =>
        dispatch({ type: "UPDATE_SOURCE_LANG", payload: sourceLang }),
      []
    ),
    updateTargetLang: useCallback(
      (targetLang: string) =>
        dispatch({ type: "UPDATE_TARGET_LANG", payload: targetLang }),
      []
    ),
  };

  return (
    <ProjectContext.Provider
      value={{
        projectName,
        projectId,
        fileName,
        fileId,
        sourceLang,
        targetLang,
        ...handlers,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error(
      "useEditor must be used within the ProjectContext provider"
    );
  }

  return context;
}
