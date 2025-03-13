import { TitleDescription } from "@/types";
import { Project } from "@/types/Project";
import CardComponent, { FieldData } from "./CardComponent";
import { Button } from "../button";
import ButtonLoader from "../ButtonLoader";
import { Label } from "../label";
import { Switch } from "../switch";
import { useProjectCard } from "@/hooks/useProjectCard";
import Container from "../Container";

type ProjectHeader = TitleDescription;
export type CardProject = Pick<Project, "name" | "description" | "status">;
export type InitialProject = (CardProject & { id?: number }) | null;
type Mode = "create" | "update";
type SubmitConfig = {
  isLoading: boolean;
  onSubmit: (project: InitialProject) => void;
  submitButtonText: string;
  footerText?: string;
};

export default function ProjectCard({
  mode,
  header,
  initialProject,
  submitConfig,
}: {
  header: ProjectHeader;
  initialProject: InitialProject;
  mode: Mode;
  submitConfig: SubmitConfig;
}) {
  const {
    name,
    description,
    nameError,
    descriptionError,
    status,
    setStatus,
    handleNameChange,
    handleDescriptionChange,
    handleNameBlur,
    handleDescriptionBlur,
    handleSubmit,
  } = useProjectCard({
    initialProject,
    onSubmit: submitConfig.onSubmit,
  });

  const fieldData: FieldData[] = [
    {
      label: "Name",
      value: name,
      onChange: handleNameChange,
      onBlur: handleNameBlur,
      error: nameError,
    },
    {
      label: "Description",
      value: description,
      onChange: handleDescriptionChange,
      onBlur: handleDescriptionBlur,
      error: descriptionError,
    },
  ];
  return (
    <form onSubmit={handleSubmit}>
      <CardComponent>
        <CardComponent.Header
          title={header.title}
          description={header.description}
        >
          {mode === "update" && (
            <Container className="flex items-center space-x-2 text-sm">
              <Switch
                id="project-active"
                checked={status}
                onCheckedChange={(val) => setStatus(val)}
              />
              <Label htmlFor="project-active">Active</Label>
            </Container>
          )}
        </CardComponent.Header>
        <CardComponent.Content>
          {fieldData.map((field) => (
            <CardComponent.Field key={field.label} data={field} />
          ))}
        </CardComponent.Content>
        <CardComponent.Footer text="Project name must be between 1 and 36 characters long. Project description between 3 and 100.">
          <Button size="sm" type="submit">
            <ButtonLoader isLoading={submitConfig.isLoading}>
              {submitConfig.submitButtonText}
            </ButtonLoader>
          </Button>
        </CardComponent.Footer>
      </CardComponent>
    </form>
  );
}
