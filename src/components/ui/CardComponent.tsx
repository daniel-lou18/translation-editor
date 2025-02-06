import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactNode } from "react";

export type CardComponentProps = {
  children?: ReactNode;
  header?: {
    title?: string;
    description?: string;
  };
  footer?: ReactNode;
};

export default function CardComponent({
  children,
  header,
  footer,
}: CardComponentProps) {
  return (
    <Card>
      {header ? (
        <CardHeader>
          {header.title ? <CardTitle>{header.title}</CardTitle> : null}
          {header.description ? (
            <CardDescription>{header.description}</CardDescription>
          ) : null}
        </CardHeader>
      ) : null}
      <CardContent>{children}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
}
