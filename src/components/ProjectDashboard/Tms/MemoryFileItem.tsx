import { FileText, X } from "lucide-react";
import Container from "../../ui/Container";
import { ElementType, PropsWithChildren } from "react";

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
  icon?: ElementType;
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

function Body({ children }: PropsWithChildren) {
  return (
    <Container className="text-sm truncate text-gray-600 mb-3">
      {children}
    </Container>
  );
}

function Footer({ children }: PropsWithChildren) {
  return (
    <Container className="flex items-center gap-2 mt-auto">
      {children}
    </Container>
  );
}

MemoryFileItem.Header = Header;
MemoryFileItem.Body = Body;
MemoryFileItem.Footer = Footer;

export default MemoryFileItem;

// <Container className="flex items-center justify-between mb-3">
//   <Container className="flex items-center gap-2">
//     <FileText className="w-5 h-5 text-primary" />
//     <span className="font-medium text-primary">Source Document</span>
//   </Container>
//   <button
//     onClick={onRemoveFile}
//     className="p-1 hover:bg-primary/10 rounded-full transition-colors"
//   >
//     <X className="w-4 h-4 text-primary" />
//   </button>
// </Container>

// <Container className="text-sm truncate text-gray-600 mb-3">
//   {file.name}
// </Container>

// <Container className="flex items-center gap-2 mt-auto">
// <span className="text-sm text-gray-600">Language:</span>
// <Combobox
//   name="source-language"
//   items={langItems}
//   value={currentLang}
//   onChange={onLangChange}
//   className="w-full h-9"
// />
// </Container>
