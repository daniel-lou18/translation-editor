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
import { LoaderCircle } from "lucide-react";
import { ComponentPropsWithoutRef, useState } from "react";

export type ComboDataElement<T extends string> = { value: T; label: string };

type ComboboxProps<T extends string> = {
  name: string;
  items: ComboDataElement<T>[];
  isProcessing: boolean;
  onSelectLang: (value: T) => void;
} & Omit<ComponentPropsWithoutRef<"button">, "onChange">;

export default function TranslationCombobox<T extends string>({
  name,
  items,
  isProcessing,
  onSelectLang,
  className,
}: ComboboxProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          role="combobox"
          aria-expanded={open}
          className={className}
        >
          {isProcessing ? (
            <LoaderCircle size={5} className="animate-spin" />
          ) : (
            "New Translation"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[150px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${name}`} />
          <CommandList>
            <CommandEmpty>{`No ${name} found.`}</CommandEmpty>
            <CommandGroup heading="Choose language to add translation">
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    onSelectLang(currentValue as T);
                    setOpen(false);
                  }}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
