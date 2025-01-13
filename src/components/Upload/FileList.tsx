import { FileInfo } from "@/components/Upload";
import FileItem from "./FileItem";
import Container from "../ui/Container";
import { ReactNode } from "react";

type FileListProps = {
  children: ReactNode;
  files: FileInfo[];
  handleRemove: (index: number) => void;
};

export default function FileList({
  children,
  files,
  handleRemove,
}: FileListProps) {
  return (
    <>
      {files.length > 0 && (
        <Container className="w-full space-y-4">
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
                  onRemove={() => handleRemove(index)}
                />
              ))}
            {files
              .filter((f) => f.type === "memory")
              .map((file, index) => (
                <FileItem
                  key={index}
                  file={file}
                  onRemove={() => handleRemove(index)}
                />
              ))}
          </Container>
        </Container>
      )}
    </>
  );
}
