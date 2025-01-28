import Container from "@/components/ui/Container";
import ReformulationMatches from "@/components/TextEditor/SideMenu/ReformulationMatches";
import MemoryMatches from "./MemoryMatches";
import DataHandler from "../../ui/DataHandler";
import MatchSkeletons from "./MatchSkeletons";
import { useEditor } from "@/contexts/editorContext";
import { useReformulate } from "@/hooks/useReformulate";
import { useSemanticMatches } from "@/hooks/useSemanticMatches";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

export default function SideMenu() {
  const { getActiveSegment } = useEditor();
  const activeSegment = getActiveSegment();
  const {
    matches,
    isPending: isLoadingMatches,
    isError,
    error,
  } = useSemanticMatches(activeSegment);
  const { reformulation, isLoading: isLoadingReformulation } = useReformulate(
    activeSegment.id
  );

  return (
    <Container className="col-span-3 space-y-4 sticky top-8 min-h-screen h-fit">
      <Container className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <Tabs defaultValue="tm" className="space-y-4">
          <TabsList className="bg-cat-memory">
            <TabsTrigger value="tm">Translation Memory</TabsTrigger>
            <TabsTrigger value="glossary">Term Base</TabsTrigger>
          </TabsList>
          <TabsContent value="tm">
            <DataHandler
              isLoading={isLoadingMatches || isLoadingReformulation}
              isError={isError}
              error={error}
              errorComponent={
                <p className="text-sm text-muted-foreground">
                  No matches found
                </p>
              }
              loadingComponent={<MatchSkeletons />}
            >
              <ReformulationMatches
                sourceText={activeSegment.sourceText}
                reformulation={reformulation}
              />
              <MemoryMatches matches={matches} />
            </DataHandler>
          </TabsContent>
        </Tabs>
      </Container>
    </Container>
  );
}
