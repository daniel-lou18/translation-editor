import { useCallback } from "react";
import DataHandler from "@/components/ui/DataHandler";
import { useTmRoute } from "@/hooks/useTmRoute";
import { useTms } from "@/hooks/useTms";
import SelectTm from "./SelectTm";
import { TmControlsSkeleton } from "./TmControlsSkeleton";
import TopbarContainer from "@/components/ui/Editor/TopbarContainer";
import Logo from "@/components/ui/Editor/Logo";
import { Separator } from "@/components/ui/separator";

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
        isLoading={isLoading}
        isError={isError}
        error={error}
        loadingComponent={<TmControlsSkeleton />}
      >
        <Logo />
        <Separator orientation="vertical" className="h-6" />
        <SelectTm
          tms={normalizedTms}
          currentTm={tmId ? normalizedTms?.[tmId] : null}
          onSelect={handleTmSelect}
        />
      </DataHandler>
    </TopbarContainer>
  );
}
