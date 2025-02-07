import { projectService } from "@/services/projectService";
import { OptionalProjectWithId } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateProject() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (project: OptionalProjectWithId) =>
      projectService.updateProject(project),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  function handleSuccess() {
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    toast.success("Project name has been successfully updated", {
      classNames: { toast: "bg-green-200" },
    });
  }

  function handleError() {
    toast.error("Could not update project name", {
      classNames: { toast: "bg-red-200" },
    });
  }

  return { mutate, isLoading: isPending, isError, error };
}
