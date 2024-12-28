import { FileSearch, Languages } from "lucide-react";
import { Button } from "./button";
import Container from "./Container";
import { useEditor } from "@/contexts/editorContext";
import { useQueryClient } from "@tanstack/react-query";

export default function EditorControls() {
  const { segments } = useEditor();
  const queryClient = useQueryClient();

  console.log(queryClient.getQueriesData({ queryKey: ["matches"] }));

  function getTranslation() {}

  return (
    <Container className="flex w-full mb-2">
      <Button
        variant="ghost"
        size="icon"
        className="border border-transparent hover:border-cat-accent/10"
        onClick={getTranslation}
      >
        <Languages />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="border border-transparent hover:border-cat-accent/10"
      >
        <FileSearch />
      </Button>
    </Container>
  );
}
