import BreadcrumbLayout from "./BreadcrumbLayout";
import Container from "../Container";
import NavbarRight from "./NavbarRight";

export default function Navbar() {
  return (
    <Container
      as="header"
      className="flex justify-between h-14 shrink-0 items-center gap-2 border-b pl-4 pr-6 bg-white"
    >
      <BreadcrumbLayout />
      <NavbarRight />
    </Container>
  );
}
