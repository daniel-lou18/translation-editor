import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TextEditor from "./pages/TextEditor";
import EditorContextProvider from "./contexts/editorContext";

const queryClient = new QueryClient();

function App() {
  return (
    <EditorContextProvider>
      <QueryClientProvider client={queryClient}>
        <TextEditor />
      </QueryClientProvider>
    </EditorContextProvider>
  );
}

export default App;
