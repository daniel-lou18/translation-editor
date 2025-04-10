import { translationStatusConfig } from "@/config/translationsTable";
import SyncStatus from "@/components/TextEditor/ProjectControls/SyncStatus";
import TranslationStatus from "@/components/TextEditor/ProjectControls/TranslationStatus";
import NavbarRight from "@/components/ui/Layout/NavbarRight";
import { useMutationState } from "@tanstack/react-query";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useRoute } from "@/hooks/useRoute";

export default function ProjectControlsRight() {
  const { currentTranslation } = useCurrentProject();
  const { translationId } = useRoute();

  const data = useMutationState({
    filters: { mutationKey: ["save-segments", translationId] },
  });
  const isSavingSegments = data.some(
    (mutation) => mutation.status === "pending"
  );

  return (
    <NavbarRight>
      <TranslationStatus
        status={currentTranslation?.status || "not_started"}
        statusConfig={translationStatusConfig}
      />
      <SyncStatus isSaving={isSavingSegments} />
    </NavbarRight>
  );
}
