import FileItem from "./FileItem";
import Container from "../ui/Container";
import { ReactNode } from "react";
import { FileInfo } from "@/hooks/useFileManager";
import { Lang } from "@/types";

export type LangData = {
  languages: Lang[];
  sourceLang: Lang;
  targetLang: Lang;
};

type FileListProps = {
  children: ReactNode;
  files: FileInfo[];
  onRemove: (index: number) => void;
  langData: LangData;
  onSourceLangChange: (newLang: Lang) => void;
  onTargetLangChange: (newLang: Lang) => void;
};

export default function FileList({
  children,
  files,
  onRemove,
  ...props
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
                <FileItem
                  key={index}
                  file={file}
                  onRemove={() => onRemove(index)}
                  {...props}
                />
              ))}
            {files
              .filter((f) => f.type === "memory")
              .map((file, index) => (
                <FileItem
                  key={index}
                  file={file}
                  onRemove={() => onRemove(index)}
                  {...props}
                />
              ))}
          </Container>
        </Container>
      )}
    </>
  );
}
