import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { ComponentProps } from "react";

type SearchFormProps = ComponentProps<"input"> & { className?: string };

export default function SearchForm({ className, ...props }: SearchFormProps) {
  return (
    <form className={cn("relative h-9", className)} role="search">
      <Label htmlFor="search" className="sr-only">
        Search
      </Label>
      <Input
        type="search"
        className={
          "h-9 pl-8 bg-background border-border shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        }
        placeholder={props.placeholder}
        {...props}
      />
      <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
    </form>
  );
}
