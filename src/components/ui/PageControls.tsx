import { PropsWithChildren } from "react";
import Container from "./Container";

type PageControlsProps = PropsWithChildren;

export default function PageControls({ children }: PageControlsProps) {
  return <Container className="flex gap-3 items-center">{children}</Container>;
}
