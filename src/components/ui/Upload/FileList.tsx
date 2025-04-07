import Container from "../Container";
import { ReactNode } from "react";
import { FileInfo } from "@/hooks/useFileManager";
import { Lang, Domain } from "@/types";
import DocumentFileItem from "./DocumentFileItem";

export type FileItemData = {
  langItems: { value: Lang; label: Lang }[];
  domainItems: { value: Domain; label: Domain }[];
  sourceLang: Lang;
  targetLang: Lang;
  domain: Domain;
};

type FileListProps = {
  children: ReactNode;
  files: FileInfo[];
  onRemove: (index: number) => void;
  itemData: FileItemData;
  onSourceLangChange: (newLang: Lang) => void;
  onTargetLangChange: (newLang: Lang) => void;
  onDomainChange: (newDomain: Domain) => void;
};

export default function FileList({
  children,
  files,
  onRemove,
  itemData,
  onSourceLangChange,
  onTargetLangChange,
  onDomainChange,
}: FileListProps) {
  return (
    <>
      {files.length > 0 && (
        <Container className="w-full space-y-4 mt-4">
          <Container className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-foreground">
              Files to upload
            </h2>
            <Container>{children}</Container>
          </Container>
          <Container className="space-y-2">
            {files
              .filter((f) => f.type === "document")
              .map((file, index) => (
                <DocumentFileItem
                  key={index}
                  file={file}
                  itemData={itemData}
                  onSourceLangChange={onSourceLangChange}
                  onTargetLangChange={onTargetLangChange}
                  onDomainChange={onDomainChange}
                  onRemove={() => onRemove(index)}
                />
              ))}
            {files
              .filter((f) => f.type === "memory")
              .map((file, index) => (
                <DocumentFileItem
                  key={index}
                  file={file}
                  itemData={itemData}
                  onSourceLangChange={onSourceLangChange}
                  onTargetLangChange={onTargetLangChange}
                  onDomainChange={onDomainChange}
                  onRemove={() => onRemove(index)}
                />
              ))}
          </Container>
        </Container>
      )}
    </>
  );
}
