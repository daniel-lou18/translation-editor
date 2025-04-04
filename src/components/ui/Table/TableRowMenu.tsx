import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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

export type DropdownMenuItem = {
  value: string;
} & (
  | { subItems: DropdownMenuItem[]; onClick?: undefined }
  | { subItems?: undefined; onClick: (param: any) => void }
);

export type DeleteMenuItem = {
  value: "delete";
  onClick: (param: any) => void;
  subItems?: undefined;
};

export type DataType = {
  id: number;
};

export type TableRowMenuProps<T extends DataType> = {
  name: string;
  data: T;
  items: (DropdownMenuItem | DeleteMenuItem)[];
};

export default function TableRowMenu<T extends DataType>({
  name,
  data,
  items,
}: TableRowMenuProps<T>) {
  function handleDelete(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const deleteItem = items.find(
      (item) => item.value.toLowerCase() === "delete"
    ) as DeleteMenuItem | undefined;
    if (deleteItem) {
      deleteItem.onClick(data);
    }
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
          {items.slice(0, -1).map((item) =>
            "subItems" in item && item.subItems ? (
              <DropdownMenuSub key={item.value}>
                <DropdownMenuSubTrigger>{item.value}</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {item.subItems.map((subItem) => (
                      <DropdownMenuItem
                        key={subItem.value}
                        onSelect={() => {
                          if ("onClick" in subItem && subItem.onClick) {
                            subItem.onClick(data);
                          }
                        }}
                      >
                        {subItem.value}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ) : (
              <DropdownMenuItem
                key={item.value}
                onSelect={() => {
                  if ("onClick" in item) {
                    item.onClick(data);
                  }
                }}
              >
                {item.value}
              </DropdownMenuItem>
            )
          )}
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
