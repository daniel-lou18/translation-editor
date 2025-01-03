import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditorContextProvider from "./contexts/editorContext";
import { BrowserRouter } from "react-router";
import Routes from "./Routes";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <EditorContextProvider>
          <Routes />
        </EditorContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
