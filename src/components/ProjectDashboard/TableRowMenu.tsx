import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { FormEvent } from "react";

export type TableRowMenuProps = {
  name: string;
  items: string[];
};

export default function TableRowMenu({ name, items }: TableRowMenuProps) {
  function handleDelete(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("delete");
  }

  return (
    <Dialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:border hover:border-muted-foreground"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {items.map((item) => (
            <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>{`Delete ${name}`}</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            {`This action cannot be undone. This will permanently delete your
            ${name} and remove your data from our servers.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form onSubmit={handleDelete}>
            <Button size="sm" variant="destructive" type="submit">
              {`Delete ${name}`}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
