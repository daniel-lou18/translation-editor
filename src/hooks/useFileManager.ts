import { allowedDocumentTypes, allowedMemoryTypes } from "@/types/Files";
import { useState } from "react";

export interface FileInfo {
  file: File;
  type: "document" | "memory";
}

export function useFileManager() {
  const [files, setFiles] = useState<FileInfo[]>([]);

  function processFiles(newFiles: File[], type: "document" | "memory") {
    const validExtensions =
      type === "document" ? allowedDocumentTypes : allowedMemoryTypes;
    const processedFiles = newFiles
      .filter((file) =>
        validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
      )
      .map((file) => ({ file, type }));

    setFiles((prev) => [...prev, ...processedFiles]);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  return { files, processFiles, removeFile };
}
