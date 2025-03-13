import ProjectCard from "@/components/ui/Card/ProjectCard";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useUpdateProject } from "@/hooks/useUpdateProject";

const headerData = {
  title: "Modify project",
  description: "You can modify the project name, description and status here.",
};

export default function UpdateProject() {
  const { currentProject } = useCurrentProject();
  const { mutate, isLoading } = useUpdateProject();

  if (!currentProject) {
    return <div>No project found</div>;
  }

  return (
    <ProjectCard
      mode="update"
      header={headerData}
      initialProject={currentProject}
      submitConfig={{
        isLoading,
        onSubmit: (project) => {
          if (project) {
            mutate({
              id: currentProject.id,
              name: project.name,
              description: project.description,
              status: project.status,
            });
          }
        },
        submitButtonText: "Save",
      }}
    />
  );
}
