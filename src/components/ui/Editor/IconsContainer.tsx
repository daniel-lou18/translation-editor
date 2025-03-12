import { PropsWithChildren } from "react";
import Container from "../Container";

export default function IconsContainer({ children }: PropsWithChildren) {
  return (
    <Container className="h-9 inline-flex items-center rounded-md border border-border p-0.5 mr-3">
      {children}
    </Container>
  );
}
