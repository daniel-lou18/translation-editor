import { useQuery } from "@tanstack/react-query";
import { tmService } from "@/services/tmService";

export function useTms() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["tms"],
    queryFn: () => tmService.getTms(),
  });

  return {
    tms: data || [],
    isLoading: isPending,
    isError,
    error,
  };
}
