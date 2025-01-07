import { segmentsService } from "@/services/segmentsService";
import { useQuery } from "@tanstack/react-query";

export function useSegments(
  projectId: string | undefined,
  translationId: string | undefined
) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["segments", translationId],
    queryFn: () => getSegmentsData(projectId, translationId),
    enabled: !!projectId && !!translationId,
  });

  async function getSegmentsData(
    projectId: string | undefined,
    translationId: string | undefined
  ) {
    if (!projectId || !translationId) {
      throw new Error("Project or translation id is missing");
    }

    return await segmentsService.getSegments(projectId, translationId);
  }

  return { segments: data || null, isLoading: isPending, isError, error };
}
