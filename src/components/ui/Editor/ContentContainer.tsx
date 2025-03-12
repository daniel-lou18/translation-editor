import { PropsWithChildren } from "react";
import Container from "../Container";

export default function ContentContainer({ children }: PropsWithChildren) {
  return (
    <Container className="col-span-9 bg-background shadow-sm divide-y divide-gray-100 border-r border-border">
      {children}
    </Container>
  );
}
