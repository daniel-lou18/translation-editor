import { translationStatusConfig } from "@/config/translationsTable";
import SyncStatus from "@/components/TextEditor/ProjectControls/SyncStatus";
import TranslationStatus from "@/components/TextEditor/ProjectControls/TranslationStatus";
import NavbarRight from "@/components/ui/Layout/NavbarRight";
import { useMutationState } from "@tanstack/react-query";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useRoute } from "@/hooks/useRoute";
import { useUpdateTranslationStatus } from "@/hooks/useUpdateTranslationStatus";

export default function ProjectControlsRight() {
  const { currentTranslation } = useCurrentProject();
  const { translationId } = useRoute();
  const { updateTranslationStatus } = useUpdateTranslationStatus();
  const data = useMutationState({
    filters: { mutationKey: ["save-segments"] },
  });
  const isSavingSegments = data.some(
    (mutation) => mutation.status === "pending"
  );

  return (
    <NavbarRight>
      <TranslationStatus
        status={currentTranslation?.status || "not_started"}
        onStatusChange={(status) => {
          if (!translationId) return;
          updateTranslationStatus({
            translationId,
            status,
          });
        }}
        statusConfig={translationStatusConfig}
      />
      <SyncStatus isSaving={isSavingSegments} />
    </NavbarRight>
  );
}
