import { ReactNode } from "react";
import Container from "../ui/Container";

type PageTitleProps = {
  children?: ReactNode;
  title: string;
};

export default function PageTitle({ children, title }: PageTitleProps) {
  return (
    <Container className="flex justify-between mb-6">
      <h1 className="font-semibold text-2xl">{title}</h1>
      <Container className="flex gap-3">{children}</Container>
    </Container>
  );
}
