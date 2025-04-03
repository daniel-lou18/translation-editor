import { PropsWithChildren } from "react";
import Container from "./Container";
import { cn } from "@/lib/utils";

type PageControlsProps = PropsWithChildren<{
  className?: string;
}>;

export default function PageControls({
  children,
  className,
}: PageControlsProps) {
  return (
    <Container className={cn("flex gap-3 items-center", className)}>
      {children}
    </Container>
  );
}
