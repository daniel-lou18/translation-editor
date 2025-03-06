import { useCallback, useState } from "react";

export function useUploadSingle() {
  const [file, setFile] = useState<File | null>(null);

  const removeFile = useCallback(() => {
    setFile(null);
  }, []);

  return {
    file,
    setFile,
    removeFile,
  };
}
