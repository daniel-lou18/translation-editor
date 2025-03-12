import ModeToggle from "./Theme";
import UserMenu from "./UserMenu";
import Container from "../Container";

export default function NavbarRight() {
  return (
    <Container className="flex items-center gap-2">
      <ModeToggle />
      <UserMenu />
    </Container>
  );
}
