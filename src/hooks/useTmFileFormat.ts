import { useState } from "react";
import { FileText, Sheet } from "lucide-react";

type TmFormat = "sheet" | "document";

const tmFormats = [
  { type: "sheet", Icon: Sheet },
  { type: "document", Icon: FileText },
] as const;

export type TmFormats = typeof tmFormats;

export function useTmFileFormat(
  setSourceFile: React.Dispatch<React.SetStateAction<File | null>>,
  setTargetFile: React.Dispatch<React.SetStateAction<File | null>>
) {
  const [tmFormat, setTmFormat] = useState<TmFormat>("document");

  function toggleTmFormat() {
    setTmFormat((prev) => (prev === "document" ? "sheet" : "document"));
    setSourceFile(null);
    setTargetFile(null);
  }

  return { tmFormat, toggleTmFormat, tmFormats };
}
