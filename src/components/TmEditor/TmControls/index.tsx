import { useCallback } from "react";
import { BrainCircuit } from "lucide-react";
import Container from "@/components/ui/Container";
import DataHandler from "@/components/ui/DataHandler";
import { useTmRoute } from "@/hooks/useTmRoute";
import { useTms } from "@/hooks/useTms";
import SelectTm from "./SelectTm";
import { TmControlsSkeleton } from "./TmControlsSkeleton";

export default function TmControls() {
  const { tmId, navigateToTm } = useTmRoute();
  const { normalizedTms, isLoading, isError, error } = useTms();

  const handleTmSelect = useCallback(
    (selectedTmId: string) => {
      navigateToTm(selectedTmId);
    },
    [navigateToTm]
  );

  return (
    <Container className="sticky top-0 z-10 col-span-12 flex items-center w-full gap-6 px-2 py-1 text-muted-foreground font-semibold border-b border-border bg-gray-50">
      <BrainCircuit className="text-cat-accent ml-2" size={20} />

      <DataHandler
        isLoading={isLoading}
        isError={isError}
        error={error}
        loadingComponent={<TmControlsSkeleton />}
      >
        <SelectTm
          tms={normalizedTms}
          currentTm={tmId ? normalizedTms?.[tmId] : null}
          onSelect={handleTmSelect}
        />
      </DataHandler>
    </Container>
  );
}
