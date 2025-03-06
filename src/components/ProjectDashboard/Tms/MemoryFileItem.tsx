import { FileText, X } from "lucide-react";
import Container from "../../ui/Container";
import { ComponentType, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
function MemoryFileItem({ children }: PropsWithChildren) {
  return (
    <Container className="rounded-lg border border-gray-200 overflow-hidden relative">
      <Container className="h-[200px] bg-cat-memory/70 rounded-lg p-3 flex flex-col">
        {children}
      </Container>
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

MemoryFileItem.Header = Header;
MemoryFileItem.Body = Body;
MemoryFileItem.Footer = Footer;

export default MemoryFileItem;
