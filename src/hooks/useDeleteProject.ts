import { useQueryClient } from "@tanstack/react-query";
import { useBaseMutation } from "./useBaseMutation";
import { projectService } from "@/services/projectService";
import { toast } from "sonner";
import { useCurrentProject } from "./useCurrentProject";
import { useTranslationRoute } from "./useTranslationRoute";

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const { currentProject } = useCurrentProject();
  const { navigateToProjects } = useTranslationRoute();

  const { mutate, isPending } = useBaseMutation({
    mutationFn: () => {
      if (!currentProject) {
        throw new Error("No project");
      }
      return projectService.deleteProject(currentProject.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      navigateToProjects();
      toast.success("Project deleted successfully");
    },
    onError: () => {
      toast.error("Could not delete project");
    },
  });

  return { deleteProject: mutate, isDeleting: isPending };
}
