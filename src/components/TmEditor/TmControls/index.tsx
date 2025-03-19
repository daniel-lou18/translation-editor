import { useCallback } from "react";
import { useTmRoute } from "@/hooks/useTmRoute";
import { useTms } from "@/hooks/useTms";
import SelectTm from "./SelectTm";
import { TmControlsSkeleton } from "./TmControlsSkeleton";
import TopbarContainer from "@/components/ui/Editor/TopbarContainer";
import Error from "@/components/ui/Error/FileError";

export default function TmControls() {
  const { tmId, navigateToTm } = useTmRoute();
  const { normalizedTms, isLoading, isError, error } = useTms();

  const handleTmSelect = useCallback(
    (selectedTmId: string) => {
      navigateToTm(selectedTmId);
    },
    [navigateToTm]
  );

  function renderTmControls() {
    if (isLoading) return <TmControlsSkeleton />;
    if (isError)
      return <Error title="Error Loading Tm Controls" error={error} />;
    if (Object.keys(normalizedTms).length === 0)
      return (
        <div className="p-4 text-sm text-muted-foreground">
          No translation memories available
        </div>
      );

    return (
      <SelectTm
        tms={normalizedTms}
        currentTm={tmId ? normalizedTms?.[tmId] : null}
        onSelect={handleTmSelect}
      />
    );
  }

  return <TopbarContainer>{renderTmControls()}</TopbarContainer>;
}
