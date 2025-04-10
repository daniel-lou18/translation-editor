import ModeToggle from "./Theme";
import UserMenu from "./UserMenu";
import Container from "../Container";
import { PropsWithChildren } from "react";

export default function NavbarRight({ children }: PropsWithChildren) {
  return (
    <Container className="flex items-center gap-2">
      {children}
      <ModeToggle />
      <UserMenu />
    </Container>
  );
}
