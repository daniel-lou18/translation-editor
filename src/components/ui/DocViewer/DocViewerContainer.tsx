import Container from "../Container";
import { ReactNode } from "react";

export default function DocViewerContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Container className="flex flex-col w-full border border-border rounded-md overflow-hidden">
      {children}
    </Container>
  );
}
