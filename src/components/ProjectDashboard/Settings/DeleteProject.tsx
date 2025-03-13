import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/ButtonLoader";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useDeleteProject } from "@/hooks/useDeleteProject";
import { LoaderCircle } from "lucide-react";
import { FormEvent } from "react";

const projectNameData = {
  header: {
    title: "Delete Project",
    description:
      "This will permanently delete you project. Please not that this action is irreversible, so proceed with caution",
  },
};

export default function DeleteProject() {
  const { deleteProject, isDeleting } = useDeleteProject();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    deleteProject();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="px-6 py-4 space-y-0">
          <CardTitle className="text-lg">
            {projectNameData.header.title}
          </CardTitle>
          <CardDescription>
            {projectNameData.header.description}{" "}
          </CardDescription>
        </CardHeader>
        <CardFooter className="py-4 border-t border-sidebar-border justify-between bg-destructive/10">
          <p className="text-sm text-destructive">
            This action cannot be undone!
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" type="button" variant="destructive">
                Delete project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="space-y-4">
                <DialogTitle>
                  Are you sure you want to delete this project?
                </DialogTitle>
                <DialogDescription>
                  This will permanently delete you project. Please not that this
                  action is irreversible, so proceed with caution
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <form onSubmit={handleSubmit}>
                  <Button
                    size="sm"
                    variant="destructive"
                    type="submit"
                    disabled={isDeleting}
                  >
                    <ButtonLoader isLoading={isDeleting}>
                      Delete project
                    </ButtonLoader>
                  </Button>
                </form>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </form>
  );
}
