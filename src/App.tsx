import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TextEditor from "./pages/TextEditor";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TextEditor />
    </QueryClientProvider>
  );
}

export default App;
