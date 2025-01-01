import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TextEditorPage from "./pages/TextEditor";
import EditorContextProvider from "./contexts/editorContext";

const queryClient = new QueryClient();

function App() {
  return (
    <EditorContextProvider>
      <QueryClientProvider client={queryClient}>
        <TextEditorPage />
      </QueryClientProvider>
    </EditorContextProvider>
  );
}

export default App;
