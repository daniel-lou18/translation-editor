import { FileText, X } from "lucide-react";
import Container from "../Container";
import { ComponentType, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

function FileItem({ children }: PropsWithChildren) {
  return (
    <Container className="min-h-[250px] bg-gradient-to-br from-muted/50 to-cat-memory rounded-lg p-3 flex flex-col rounded-lg border border-border overflow-hidden relative">
      {children}
    </Container>
  );
}

type HeaderProps = PropsWithChildren<{
  onRemoveFile: () => void;
  icon?: ComponentType<{ className?: string }>;
}>;

function Header({ onRemoveFile, icon, children }: HeaderProps) {
  const Icon = icon || FileText;

  return (
    <Container className="flex items-center justify-between mb-3">
      <Container className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-primary" />
        <span className="font-medium text-primary">{children}</span>
      </Container>
      <button
        onClick={onRemoveFile}
        className="p-1 hover:bg-primary/10 rounded-full transition-colors"
      >
        <X className="w-4 h-4 text-primary" />
      </button>
    </Container>
  );
}

function Body({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <Container className={cn("text-sm truncate text-gray-600 mb-3", className)}>
      {children}
    </Container>
  );
}

function Footer({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <Container className={cn("flex items-center gap-12 mt-auto", className)}>
      {children}
    </Container>
  );
}

FileItem.Header = Header;
FileItem.Body = Body;
FileItem.Footer = Footer;

export default FileItem;
