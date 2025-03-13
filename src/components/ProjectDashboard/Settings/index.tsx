import Container from "@/components/ui/Container";
import DeleteProject from "./DeleteProject";
import ProjectName from "./UpdateProject";
import PageTitle from "@/components/ui/PageTitle";

export default function ProjectSettings() {
  return (
    <Container className="space-y-8">
      <PageTitle title="Project settings" />
      <ProjectName />
      <DeleteProject />
    </Container>
  );
}
