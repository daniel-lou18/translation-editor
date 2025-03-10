import { tmService } from "@/services/tmService";
import { useQuery } from "@tanstack/react-query";
import { useTmRoute } from "./useTmRoute";

export function useTmSegments() {
  const { tmId } = useTmRoute();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["tm", tmId],
    queryFn: () => {
      if (!tmId) {
        throw new Error("TM ID is required");
      }
      return tmService.getTmSegments(tmId);
    },
    enabled: !!tmId,
  });

  return {
    tmSegments: data || null,
    isLoading: isPending,
    isError,
    error,
  };
}
