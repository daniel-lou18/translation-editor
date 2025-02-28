import { FileText, X } from "lucide-react";
import Container from "../ui/Container";
import { Lang } from "@/types";
import Combobox from "../ui/Combobox";

type MemoryFileItemProps = {
  file: File;
  languages: Lang[];
  currentLang: Lang;
  onLangChange: (newLang: Lang) => void;
  onRemoveFile: () => void;
};

export default function MemoryFileItem({
  file,
  languages,
  currentLang,
  onLangChange,
  onRemoveFile,
}: MemoryFileItemProps) {

  const langItems = languages.map((lang) => ({
    value: lang,
    label: lang,
  }));

  return (
    <Container className="rounded-lg border border-gray-200 overflow-hidden relative">
       <div className="h-[200px] bg-cat-memory/70 rounded-lg p-3 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="font-medium text-primary">Source Document</span>
            </div>
            <button
              onClick={onRemoveFile}
              className="p-1 hover:bg-primary/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-primary" />
            </button>
          </div>

          <div className="text-sm truncate text-gray-600 mb-3">{file.name}</div>

          <div className="flex items-center gap-2 mt-auto">
            <span className="text-sm text-gray-600">Language:</span>
            <Combobox
              name="source-language"
              items={langItems}
              value={currentLang}
              onChange={onLangChange}
              className="w-full h-9"
            />
          </div>
        </div>
    </Container>
  );
}
