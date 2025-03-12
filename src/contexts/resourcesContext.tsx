import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useReducer,
} from "react";

type View = "tm" | "glossary";

type InitialState = {
  query: string;
  currentView: View;
};

const initialState: InitialState = {
  query: "",
  currentView: "tm",
};

type Action = { type: "CHANGE_VIEW"; payload: View };

type ResourcesActions = {
  changeView: (newView: View) => void;
};

type Context = InitialState & ResourcesActions;

const ResourcesContext = createContext<Context | null>(null);

function reducer(state: InitialState, action: Action): InitialState {
  switch (action.type) {
    case "CHANGE_VIEW":
      return {
        ...state,
        currentView: action.payload,
      };
  }
}

export default function ResourcesContextProvider({
  children,
}: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions: ResourcesActions = {
    changeView: useCallback(
      (newView: View) => dispatch({ type: "CHANGE_VIEW", payload: newView }),
      [dispatch]
    ),
  };

  return (
    <ResourcesContext.Provider value={{ ...state, ...actions }}>
      {children}
    </ResourcesContext.Provider>
  );
}

export function useResources() {
  const context = useContext(ResourcesContext);

  if (!context) {
    throw new Error(
      "useResources must be used within the ResourcesContext provider"
    );
  }

  return context;
}
