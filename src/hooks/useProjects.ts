import { projectService } from "@/services/projectService";
import { useQuery } from "@tanstack/react-query";

export function useProjects() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectService.getProjects(),
  });

  return { projects: data || null, isPending, isError, error };
}
