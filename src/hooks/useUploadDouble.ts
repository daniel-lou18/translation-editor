import { useState } from "react";

export function useUploadDouble() {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [targetFile, setTargetFile] = useState<File | null>(null);

  return {
    sourceFile,
    targetFile,
    setSourceFile,
    setTargetFile,
  };
}
