import { useQuery } from "@tanstack/react-query";
import { tmService } from "@/services/tmService";
import { useMemo } from "react";

export function useTms() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["tms"],
    queryFn: () => tmService.getTms(),
  });

  const normalizedTms = useMemo(
    () => Object.fromEntries((data || []).map((tm) => [tm.id, tm])),
    [data]
  );

  return {
    tms: data || [],
    normalizedTms,
    isLoading: isPending,
    isError,
    error,
  };
}
