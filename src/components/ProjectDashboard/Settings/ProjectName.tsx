import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/ButtonLoader";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardComponent, { FieldData } from "@/components/ui/Card/CardComponent";
import Container from "@/components/ui/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useUpdateProject } from "@/hooks/useUpdateProject";
import {
  projectDescriptionSchema,
  projectNameSchema,
} from "@/utils/validationSchemas";
import { ChangeEvent, FormEvent, useState } from "react";

const projectNameData = {
  header: {
    title: "Modify project",
    description:
      "You can modify the project name, description and status here.",
  },
};

export default function ProjectName() {
  const { currentProject } = useCurrentProject();
  const { mutate, isLoading } = useUpdateProject();
  const [name, setName] = useState<string>(
    currentProject?.name ?? "Your project name"
  );
  const [description, setDescription] = useState(
    currentProject?.description ?? "Your project description"
  );
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [status, setStatus] = useState(currentProject?.status === "active");

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setNameError("");
    const name = e.target.value;
    setName(name);
  }

  function handleDescriptionChange(e: ChangeEvent<HTMLInputElement>) {
    setDescriptionError("");
    const description = e.target.value;
    setDescription(description);
  }

  function handleNameBlur() {
    const parsed = projectNameSchema.safeParse(name);
    setNameError(parsed.success ? "" : parsed.error.errors[0].message);
  }

  function handleDescriptionBlur() {
    const parsed = projectDescriptionSchema.safeParse(description);
    setDescriptionError(parsed.success ? "" : parsed.error.errors[0].message);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNameError("");
    setDescriptionError("");

    const parsedName = projectNameSchema.safeParse(name);
    const parsedDescription = projectDescriptionSchema.safeParse(description);

    if (!parsedName.success) {
      setNameError(parsedName.error.errors[0].message);
      return;
    }

    if (!parsedDescription.success) {
      setDescriptionError(parsedDescription.error.errors[0].message);
    }

    if (!currentProject) {
      setNameError("Current project is missing");
      return;
    }

    mutate({
      id: currentProject.id,
      name,
      description,
      status: status ? "active" : "archived",
    });
  }

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
          title={projectNameData.header.title}
          description={projectNameData.header.description}
        >
          <Container className="flex items-center space-x-2 text-sm">
            <Switch
              id="project-active"
              checked={status}
              onCheckedChange={(val) => setStatus(val)}
            />
            <Label htmlFor="project-active">Active</Label>
          </Container>
        </CardComponent.Header>
        <CardComponent.Content>
          {fieldData.map((field) => (
            <CardComponent.Field key={field.label} data={field} />
          ))}
        </CardComponent.Content>
        <CardComponent.Footer text="Project name must be between 1 and 36 characters long. Project description between 3 and 100.">
          <Button size="sm" type="submit">
            <ButtonLoader isLoading={isLoading}>Save</ButtonLoader>
          </Button>
        </CardComponent.Footer>
      </CardComponent>
    </form>
  );
}
