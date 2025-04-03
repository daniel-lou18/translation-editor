import { ReactNode } from "react";
import Container from "../ui/Container";
import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type PageTitleProps = {
  title: ReactNode;
  children?: ReactNode;
  className?: string;
  level?: HeadingLevel;
};

export default function PageTitle({
  children,
  title,
  className,
  level = 1,
}: PageTitleProps) {
  const Heading = `h${level}` as const;

  return (
    <Container className="flex gap-6 items-center mb-6 justify-between">
      <Heading
        className={cn(
          "flex items-center gap-2 font-semibold text-2xl",
          className
        )}
      >
        {title}
      </Heading>
      {children}
    </Container>
  );
}
