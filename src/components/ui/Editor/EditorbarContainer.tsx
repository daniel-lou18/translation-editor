import { PropsWithChildren } from "react";
import Container from "../Container";

export default function EditorbarContainer({ children }: PropsWithChildren) {
  return (
    <Container className="sticky top-[49px] z-10 col-span-9 flex justify-between items-center px-4 py-1.5 border-b border-r border-border bg-cat-memory">
      {children}
    </Container>
  );
}
