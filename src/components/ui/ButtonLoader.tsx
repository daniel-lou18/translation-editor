import { LoaderCircle } from "lucide-react";
import { ComponentType, PropsWithChildren } from "react";
import Container from "./Container";

type ButtonLoaderProps = PropsWithChildren<{
  icon?: ComponentType<{ className?: string }>;
  isLoading: boolean;
  iconSize?: number;
}>;

export default function ButtonLoader({
  children,
  icon,
  isLoading,
  iconSize = 5,
}: ButtonLoaderProps) {
  const Icon = icon;

  return (
    <Container as="span" className="inline-flex items-center">
      {isLoading ? (
        <LoaderCircle
          className={`w-${iconSize} h-${iconSize} mr-2 animate-spin`}
        />
      ) : Icon ? (
        <Icon className={`w-${iconSize} h-${iconSize} mr-2`} />
      ) : null}
      {children}
    </Container>
  );
}
