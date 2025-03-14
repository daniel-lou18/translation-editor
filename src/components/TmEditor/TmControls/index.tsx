import { useCallback } from "react";
import DataHandler from "@/components/ui/DataHandler";
import { useTmRoute } from "@/hooks/useTmRoute";
import { useTms } from "@/hooks/useTms";
import SelectTm from "./SelectTm";
import { TmControlsSkeleton } from "./TmControlsSkeleton";
import TopbarContainer from "@/components/ui/Editor/TopbarContainer";

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
    <TopbarContainer>
      <DataHandler
        loading={{
          isLoading,
          component: <TmControlsSkeleton />,
        }}
        error={{
          isError,
          error,
        }}
        empty={{
          isEmpty: !normalizedTms || Object.keys(normalizedTms).length === 0,
          component: (
            <div className="p-4 text-sm text-muted-foreground">
              No translation memories available
            </div>
          ),
        }}
      >
        <SelectTm
          tms={normalizedTms}
          currentTm={tmId ? normalizedTms?.[tmId] : null}
          onSelect={handleTmSelect}
        />
      </DataHandler>
    </TopbarContainer>
  );
}
