import { ReactNode } from "react";
import Container from "../ui/Container";

type PageTitleProps = {
  children?: ReactNode;
  title: string;
};

export default function PageTitle({ children, title }: PageTitleProps) {
  return (
    <Container className="flex gap-6 items-center">
      <h1 className="font-semibold text-2xl">{title}</h1>
      {children}
    </Container>
  );
}
