import { PropsWithChildren } from "react";
import Container from "../Container";

export default function TmbarContainer({ children }: PropsWithChildren) {
  return (
    <Container className="sticky top-[51px] z-10 col-span-3 flex justify-between items-center px-4 py-1.5 border-b border-border bg-background">
      {children}
    </Container>
  );
}
