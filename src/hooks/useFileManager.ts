import { DOCUMENT_MIME_TYPES, MEMORY_MIME_TYPES } from "@/types/Files";
import { useState } from "react";

export interface FileInfo {
  file: File;
  type: "document" | "memory";
}

export function useFileManager() {
  const [files, setFiles] = useState<FileInfo[]>([]);

  function processFiles(newFiles: File[], type: "document" | "memory") {
    const validMimeTypes =
      type === "document" ? DOCUMENT_MIME_TYPES : MEMORY_MIME_TYPES;
    const processedFiles = newFiles
      .filter((file) =>
        validMimeTypes.some((mimeType) => file.type === mimeType)
      )
      .map((file) => ({ file, type }));

    setFiles((prev) => [...prev, ...processedFiles]);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  return { files, processFiles, removeFile };
}
