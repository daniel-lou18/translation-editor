import { ReactNode } from "react";
import Container from "../ui/Container";
import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type PageTitleProps = {
  title: ReactNode;
  children?: ReactNode;
  level?: HeadingLevel;
  classNames?: {
    container?: string;
    heading?: string;
  };
};

export default function PageTitle({
  children,
  title,
  classNames,
  level = 1,
}: PageTitleProps) {
  const Heading = `h${level}` as const;

  return (
    <Container
      className={cn(
        "flex gap-6 items-center mb-6 justify-between",
        classNames?.container
      )}
    >
      <Heading
        className={cn(
          "flex items-center gap-2 font-semibold text-2xl",
          classNames?.heading
        )}
      >
        {title}
      </Heading>
      {children}
    </Container>
  );
}
