import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/ButtonLoader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useUpdateProject } from "@/hooks/useUpdateProject";
import { projectNameSchema } from "@/utils/validationSchemas";
import { ChangeEvent, FormEvent, useState } from "react";

const projectNameData = {
  header: {
    title: "Project name",
    description: "Enter the project name you'd like to use.",
  },
};

export default function ProjectName() {
  const { currentProject } = useCurrentProject();
  const { mutate, isLoading } = useUpdateProject();
  const [name, setName] = useState<string>(
    currentProject?.name ?? "Your project name"
  );
  const [error, setError] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    setName(name);

    const parsed = projectNameSchema.safeParse(name);
    setError(parsed.success ? "" : parsed.error.errors[0].message);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const parsed = projectNameSchema.safeParse(name);

    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return;
    }

    if (!currentProject) {
      setError("Current project is missing");
      return;
    }

    mutate({ id: currentProject.id, name });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {projectNameData.header.title}
          </CardTitle>
          <CardDescription>
            {projectNameData.header.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Input value={name} onChange={handleChange} />
        </CardContent>
        <CardFooter className="py-4 border-t border-border justify-between">
          <p
            className={`text-sm ${
              error ? "text-destructive" : "text-muted-foreground"
            }`}
          >
            {error ? error : "Must be between 1 and 36 characters long"}
          </p>
          <Button size="sm" type="submit">
            <ButtonLoader isLoading={isLoading}>Save</ButtonLoader>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
