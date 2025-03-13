import { ChangeEvent, PropsWithChildren } from "react";
import { Label } from "../label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import { cn } from "@/lib/utils";
import { Input } from "../input";
import Container from "../Container";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

type HeaderProps = PropsWithChildren<{
  title: string;
  description: string;
  className?: string;
}>;

export type FieldData = {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string;
};

type ContentProps = PropsWithChildren<{
  className?: string;
}>;

type FieldProps = PropsWithChildren<{
  data: FieldData;
  className?: string;
}>;

type FooterProps = PropsWithChildren<{
  text: string;
  className?: string;
}>;

function CardComponent({ children, className }: CardProps) {
  return <Card className={className}>{children}</Card>;
}

function Header({ children, title, description, className }: HeaderProps) {
  return (
    <CardHeader
      className={cn(
        "flex flex-row justify-between px-6 py-4 border-b border-sidebar-border space-y-0",
        className
      )}
    >
      <Container>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </Container>
      <Container className="flex items-center space-x-2 text-sm">
        {children}
      </Container>
    </CardHeader>
  );
}

function Content({ children, className }: ContentProps) {
  return (
    <CardContent
      className={cn("flex flex-col justify-between gap-8 pt-4 pb-1", className)}
    >
      {children}
    </CardContent>
  );
}

function Field({ data, className }: FieldProps) {
  const { label, value, onChange, onBlur, error } = data;

  return (
    <Container className={cn("flex-1 grid grid-cols-3 gap-2", className)}>
      <Label htmlFor="project-name" className="relative top-4">
        {label}
      </Label>
      <Input
        id="project-name"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="col-span-2"
      />
      <p
        className={`min-h-4 text-xs text-destructive row-start-2 col-start-2 col-span-2`}
      >
        {error}
      </p>
    </Container>
  );
}

function Footer({ text, children, className }: FooterProps) {
  return (
    <CardFooter
      className={cn(
        "px-6 py-4 border-t border-sidebar-border justify-between",
        className
      )}
    >
      <p className={`text-sm text-muted-foreground`}>{text}</p>
      {children}
    </CardFooter>
  );
}

CardComponent.Header = Header;
CardComponent.Content = Content;
CardComponent.Field = Field;
CardComponent.Footer = Footer;

export default CardComponent;
