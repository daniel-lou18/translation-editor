import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormEvent } from "react";

const projectNameData = {
  header: {
    title: "Delete Project",
    description:
      "This will permanently delete you project. Please not that this action is irreversible, so proceed with caution",
  },
};

export default function DeleteProject() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("delete");
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {projectNameData.header.title}
          </CardTitle>
          <CardDescription>
            {projectNameData.header.description}{" "}
          </CardDescription>
        </CardHeader>
        <CardFooter className="py-4 border-t border-border justify-between bg-destructive/10">
          <p className="text-sm text-destructive">
            This action cannot be undone!
          </p>
          <Button size="sm" type="submit" variant="destructive">
            Delete project
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
