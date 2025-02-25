import { FileSpreadsheet, FileText, X } from "lucide-react";
import Container from "../ui/Container";
import { FileInfo } from "@/hooks/useFileManager";
import { Lang, Domain } from "@/types";
import Combobox from "../ui/Combobox";
import { FileItemData } from "./FileList";

type FileItemProps = {
  file: FileInfo;
  itemData: FileItemData;
  onSourceLangChange: (newLang: Lang) => void;
  onTargetLangChange: (newLang: Lang) => void;
  onDomainChange: (newDomain: Domain) => void;
  onRemove: () => void;
};

export default function FileItem({
  file,
  itemData,
  onSourceLangChange,
  onTargetLangChange,
  onDomainChange,
  onRemove,
}: FileItemProps) {
  const { languages, domains, sourceLang, targetLang, domain } = itemData;

  const langItems = languages.map((lang) => ({
    value: lang,
    label: lang,
  }));

  const domainItems = domains.map((domain) => ({
    value: domain,
    label: domain,
  }));

  return (
    <Container className="flex items-center justify-between p-3 rounded-lg bg-cat-target hover:bg-cat-target/70 transition-colors">
      <Container className="flex items-center gap-3">
        {file.type === "document" ? (
          <FileText className="w-5 h-5 text-cat-accent" />
        ) : (
          <FileSpreadsheet className="w-5 h-5 text-cat-accent" />
        )}
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
