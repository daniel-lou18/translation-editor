import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import {
  projectDescriptionSchema,
  projectNameSchema,
} from "@/utils/validationSchemas";
import { InitialProject } from "@/components/ui/Card/ProjectCard";

type UseProjectCardProps = {
  initialProject: InitialProject;
  onSubmit: (project: InitialProject) => void;
};

export function useProjectCard({
  initialProject,
  onSubmit,
}: UseProjectCardProps) {
  const [name, setName] = useState<string>(initialProject?.name ?? "");
  const [description, setDescription] = useState(
    initialProject?.description ?? ""
  );
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [status, setStatus] = useState(initialProject?.status === "active");

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

    onSubmit({
      id: initialProject?.id,
      name,
      description,
      status: status ? "active" : "archived",
    });
  }

  return {
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
  };
}
