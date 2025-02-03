import Container from "../ui/Container";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { ComponentProps } from "react";
import { Button } from "../ui/button";

type ProjectsControlsProps = ComponentProps<typeof Input>;

export default function ProjectsControls({
  className,
  ...props
}: ProjectsControlsProps) {
  return (
    <Container className="flex justify-between mb-6">
      <h1 className="font-semibold text-2xl">Daniel's projects</h1>
      <Container className="flex gap-3">
        <Container className="relative ">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <Input
            className={cn(
              "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
              className
            )}
            {...props}
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </Container>
        <Button size="sm">New Project</Button>
      </Container>
    </Container>
  );
}
