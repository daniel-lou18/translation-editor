import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { ChangeEvent, ComponentProps } from "react";

type SearchFormProps = ComponentProps<"input"> & {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function SearchForm({
  value,
  onChange,
  className,
  ...props
}: SearchFormProps) {
  return (
    <form className="relative" role="search">
      <Label htmlFor="search" className="sr-only">
        Search
      </Label>
      <Input
        type="search"
        value={value}
        onChange={onChange}
        className={cn(
          "h-8 pl-8 bg-background border-border shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
          className
        )}
        placeholder={props.placeholder}
        {...props}
      />
      <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
    </form>
  );
}
