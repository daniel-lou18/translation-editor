import Container from "../Container";
import { PropsWithChildren } from "react";
import Logo from "./Logo";
import NavbarRight from "../Layout/NavbarRight";
import { cn } from "@/lib/utils";
type TopbarContainerProps = PropsWithChildren & {
  className?: string;
};

export default function TopbarContainer({
  children,
  className,
}: TopbarContainerProps) {
  return (
    <Container
      className={cn(
        "sticky top-0 z-10 col-span-12 h-12 flex items-center justify-between w-full gap-6 px-4 text-muted-foreground font-semibold border-b border-border bg-white",
        className
      )}
    >
      <Container className="flex flex-1 items-center gap-4">
        <Logo />
        {children}
      </Container>
      <NavbarRight />
    </Container>
  );
}
