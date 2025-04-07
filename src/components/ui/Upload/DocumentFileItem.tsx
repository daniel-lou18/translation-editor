import { FileText, X } from "lucide-react";
import Container from "../Container";
import { FileInfo } from "@/hooks/useFileManager";
import { Lang, Domain } from "@/types";
import Combobox from "../Combobox";
import { FileItemData } from "./FileList";

type DocumentFileItemProps = {
  file: FileInfo;
  itemData: FileItemData;
  onSourceLangChange: (newLang: Lang) => void;
  onTargetLangChange: (newLang: Lang) => void;
  onDomainChange: (newDomain: Domain) => void;
  onRemove: () => void;
};

export default function DocumentFileItem({
  file,
  itemData,
  onSourceLangChange,
  onTargetLangChange,
  onDomainChange,
  onRemove,
}: DocumentFileItemProps) {
  const { sourceLang, targetLang, domain, langItems, domainItems } = itemData;

  return (
    <Container className="flex items-center justify-between p-3 rounded-lg bg-cat-target hover:bg-cat-target/70 transition-colors">
      <Container className="flex items-center gap-3">
        <FileText className="w-5 h-5 text-cat-accent" />
        <span className="text-sm font-medium">{file.file.name}</span>
      </Container>
      <Container className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">From:</span>
        <Combobox
          name="source"
          items={langItems}
          value={sourceLang}
          onChange={onSourceLangChange}
          className="w-48 h-9"
        />
        <span className="text-sm text-muted-foreground ml-8">To:</span>
        <Combobox
          name="target"
          items={langItems}
          value={targetLang}
          onChange={onTargetLangChange}
          className="w-48 h-9 mr-2"
        />
        <span className="text-sm text-muted-foreground ml-8">Domain:</span>
        <Combobox
          name="domain"
          items={domainItems}
          value={domain}
          onChange={onDomainChange}
          className="w-48 h-9 mr-2"
        />
        <button
          onClick={onRemove}
          className="p-1 hover:bg-cat-accent/10 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </Container>
    </Container>
  );
}
