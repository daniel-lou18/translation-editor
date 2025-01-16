import { projectService } from "@/services/projectService";
import { useQuery } from "@tanstack/react-query";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => projectService.getProjects(),
  });
}
