import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ComponentPropsWithoutRef, useState } from "react";

export type ComboDataElement<T extends string> = { value: T; label: string };

type ComboboxProps<T extends string> = {
  name: string;
  items: ComboDataElement<T>[];
  value: T | null;
  onChange: (currentValue: T) => void;
  buttonVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
} & Omit<ComponentPropsWithoutRef<"button">, "onChange">;

export default function Combobox<T extends string>({
  name,
  items,
  value,
  onChange,
  buttonVariant = "outline",
  className,
}: ComboboxProps<T>) {
  const [open, setOpen] = useState(false);

  const selectedItem = value
    ? items.find((item) => item.value === value)
    : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={buttonVariant}
          role="combobox"
          aria-expanded={open}
          className={cn("min-w-[150px] justify-between", className)}
        >
          {selectedItem
            ? selectedItem.label.length > 30
              ? `${selectedItem.label.slice(0, 30)}...`
              : selectedItem.label
            : `Select ${name}`}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[150px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${name}`} />
          <CommandList>
            <CommandEmpty>{`No ${name} found.`}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label}
                  onSelect={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
