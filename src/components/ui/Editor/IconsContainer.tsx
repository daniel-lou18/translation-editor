import { PropsWithChildren } from "react";
import Container from "../Container";

export default function IconsContainer({ children }: PropsWithChildren) {
  return (
    <Container className="inline-flex text-slate-700 items-center">
      {children}
    </Container>
  );
}
