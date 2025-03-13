import ProjectCard from "@/components/ui/Card/ProjectCard";
import Container from "@/components/ui/Container";
import PageTitle from "@/components/ui/PageTitle";
import { useCreateProject } from "@/hooks/useCreateProject";

const headerData = {
  title: "Create project",
  description: "Choose a name and description for your project.",
};

export default function NewProject() {
  const { mutate, isLoading } = useCreateProject();

  return (
    <Container className="space-y-8">
      <PageTitle title="Create project" />
      <ProjectCard
        mode="update"
        header={headerData}
        initialProject={null}
        submitConfig={{
          isLoading,
          onSubmit: (project) => {
            if (project) {
              mutate({
                name: project.name,
                description: project.description,
              });
            }
          },
          submitButtonText: "Create",
        }}
      />
    </Container>
  );
}
