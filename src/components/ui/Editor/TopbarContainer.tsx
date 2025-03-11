import Container from "../Container";
import { PropsWithChildren } from "react";
export default function TopbarContainer({ children }: PropsWithChildren) {
  return (
    <Container className="sticky top-0 z-10 col-span-12 flex items-center w-full gap-6 px-4 py-1.5 text-muted-foreground font-semibold border-b border-border bg-background">
      {children}
    </Container>
  );
}
