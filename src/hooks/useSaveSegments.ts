import { segmentsService } from "@/services/segmentsService";
import { Segment } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useTranslationRoute } from "./useTranslationRoute";

export function useSaveSegments() {
  const { projectId, translationId } = useTranslationRoute();
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: (segments: Segment[]) =>
      updateSegments(projectId, translationId, segments),
  });

  async function updateSegments(
    projectId: string | undefined,
    translationId: string | undefined,
    segments: Segment[]
  ) {
    if (!projectId || !translationId) {
      throw new Error("Project or translation id is missing");
    }

    if (!segments?.length) {
      throw new Error("No segments to update");
    }

    return await segmentsService.updateSegments(
      projectId,
      translationId,
      segments
    );
  }

  return {
    mutate,
    savedSegmentIds: data || null,
    isLoading: isPending,
    isError,
    error,
  };
}
