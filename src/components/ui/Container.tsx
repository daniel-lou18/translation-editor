import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ContainerProps<T extends ElementType = "div"> = {
  children: ReactNode;
  as?: T;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export default function Container<T extends ElementType = "div">({
  children,
  as,
  className,
  ...rest
}: ContainerProps<T>) {
  const Component = as || "div";
  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
}
