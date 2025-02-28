import UploadArea from "@/components/Upload/UploadArea";
import Overlay from "../ui/Overlay";
import {
  allowedDocumentTypes,
  allowedMemoryTypes,
  languageToCodeMap as languages,
  domains,
} from "@/utils/constants";
import { Lang } from "@/types";
import { useTmUpload } from "@/hooks/useTmUpload";
import MemoryFileItem from "./MemoryFileItem";
import { Earth, ArrowRight, BookType } from "lucide-react";
import Combobox from "../ui/Combobox";
import UploadButton from "./UploadButton";
import Container from "../ui/Container";
import { useSelectTm } from "@/hooks/useSelectTm";

type UploadTmFormProps = {
  newTm?: boolean;
};

export default function UploadTmForm({ newTm = true }: UploadTmFormProps) {
  const {
    sourceFile,
    targetFile,
    setSourceFile,
    setTargetFile,
    removeSourceFile,
    removeTargetFile,
    isLoading,
    sourceLang,
    targetLang,
    domain,
    handleSubmit,
    onSourceLangChange,
    onTargetLangChange,
    onDomainChange,
  } = useTmUpload();
  const { tmItems, tm, onTmChange } = useSelectTm();

  const domainItems = domains.map((domain) => ({
    value: domain,
    label: domain,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <Container className="my-8 rounded-lg border border-gray-200 bg-card overflow-hidden">

        {/* Header with domain selection */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
          <h3 className="text-sm font-medium">Translation Memory Pair</h3>
          <Container className="flex items-center gap-6">
            {!newTm && <div className="flex items-center gap-2">
              <BookType className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">TM:</span>
              <Combobox
                name="tm"
                items={tmItems}
                value={tm}
                onChange={onTmChange}
                className="w-80 h-8"
                />
            </div>}
            <div className="flex items-center gap-2">
              <Earth className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Domain:</span>
              <Combobox
                name="domain"
                items={domainItems}
                value={domain}
                onChange={onDomainChange}
                className="w-48 h-8"
                />
            </div>
          </Container>
        </div>

        {/* Files container with clear visual relationship */}
        <div className="relative p-4 grid grid-cols-2 gap-4">
          {/* Source file */}
          {sourceFile ?
          <MemoryFileItem
          file={sourceFile}
          languages={Object.keys(languages) as Lang[]}
          currentLang={sourceLang}
          onRemoveFile={removeSourceFile}
          onLangChange={onSourceLangChange}
          /> :
          <UploadArea
          type="memory"
          accept={allowedDocumentTypes.join(",")}
          title="Source Document"
          description={`Allowed file types: ${allowedDocumentTypes.map(type => type.slice(1).toUpperCase()).join(", ")}`}
          onFilesSelect={(files) => setSourceFile(files[0])}
          className="h-[200px] bg-cat-memory/70 hover:bg-cat-memory"
          />}

          {/* Target file */}
          {targetFile ?
          <MemoryFileItem
          file={targetFile}
          languages={Object.keys(languages) as Lang[]}
          currentLang={targetLang}
          onRemoveFile={removeTargetFile}
          onLangChange={onTargetLangChange}
          /> :
          <UploadArea
          type="memory"
          accept={allowedMemoryTypes.join(",")}
          title="Target Document"
          description={`Allowed file types: ${allowedMemoryTypes.map(type => type.slice(1).toUpperCase()).join(", ")}`}
          onFilesSelect={(files) => setTargetFile(files[0])}
          className="h-[200px] bg-cat-memory/70 hover:bg-cat-memory"
          />}

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md">
            <ArrowRight size={28} className="text-gray-500" />
          </div>
        </div>

      </Container>
      <UploadButton isProcessing={isLoading} />
      {isLoading && <Overlay />}
    </form>
  );
}
