import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";

const projectNameData = {
  header: {
    title: "Project name",
    description: "Enter the project name you'd like to use.",
  },
};

export default function ProjectName() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
          <Input />
        </CardContent>
        <CardFooter className="py-4 border-t border-border justify-between">
          <p className="text-sm text-muted-foreground">
            Must be between 1 and 36 characters long.
          </p>
          <Button size="sm" type="submit">
            Save
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
