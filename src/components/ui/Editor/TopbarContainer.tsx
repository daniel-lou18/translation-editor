import Container from "../Container";
import { PropsWithChildren } from "react";
import { Separator } from "../separator";
import Logo from "./Logo";
import NavbarRight from "../Layout/NavbarRight";

export default function TopbarContainer({ children }: PropsWithChildren) {
  return (
    <Container className="sticky top-0 z-10 col-span-12 flex items-center justify-between w-full gap-6 px-4 py-1.5 text-muted-foreground font-semibold border-b border-border bg-cat-memory">
      <Container className="flex flex-1 items-center gap-6">
        <Logo />
        <Separator orientation="vertical" className="h-6" />
        {children}
      </Container>
      <NavbarRight />
    </Container>
  );
}
