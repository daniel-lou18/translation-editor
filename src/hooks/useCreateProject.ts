import { projectService } from "@/services/projectService";
import { NewProject } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRoute } from "./useRoute";
export function useCreateProject() {
  const queryClient = useQueryClient();
  const { navigateToProjects } = useRoute();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (project: NewProject) => projectService.createProject(project),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  function handleSuccess() {
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    navigateToProjects();
    toast.success("Project has been successfully created", {
      classNames: { toast: "bg-green-100" },
    });
  }

  function handleError() {
    toast.error(`Could not create project: ${error}`, {
      classNames: { toast: "bg-red-100" },
    });
  }

  return { mutate, isLoading: isPending, isError, error };
}
