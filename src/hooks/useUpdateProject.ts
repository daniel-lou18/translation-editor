import { projectService } from "@/services/projectService";
import { OptionalProjectWithId } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateProject() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (project: OptionalProjectWithId) =>
      projectService.updateProject(project),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  return { mutate, isLoading: isPending, isError, error };
}
