import { PropsWithChildren } from "react";
import Container from "../Container";

export default function EditorbarContainer({ children }: PropsWithChildren) {
  return (
    <Container className="sticky top-12 z-10 col-span-9 flex justify-between items-center h-12 px-4 border-b border-r border-border bg-cat-memory">
      {children}
    </Container>
  );
}
