import UploadArea from "@/components/Upload/UploadArea";
import Overlay from "../../ui/Overlay";
import { Lang } from "@/types";
import MemoryFileItem from "./MemoryFileItem";
import { ArrowRight, Sheet } from "lucide-react";
import UploadButton from "../../Upload/UploadButton";
import Container from "../../ui/Container";
import { PropsWithChildren } from "react";
import { AllowedMemoryType } from "@/types/Files";
import Combobox from "@/components/ui/Combobox";

type UploadTmFormProps = PropsWithChildren<{
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
  buttonText?: string;
}>;

function UploadTmForm({
  children,
  handleSubmit,
  isLoading,
  buttonText = "Upload",
}: UploadTmFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      <Container className="my-8 rounded-lg border border-gray-200 bg-card overflow-hidden">
        {children}
      </Container>
      <UploadButton isProcessing={isLoading}>{buttonText}</UploadButton>
      {isLoading && <Overlay />}
    </form>
  );
}

type HeaderProps = PropsWithChildren<{
  title: string;
}>;

function Header({ children, title }: HeaderProps) {
  return (
    <Container className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
      <h3 className="text-sm font-medium">{title}</h3>
      <Container className="flex items-center gap-6">{children}</Container>
    </Container>
  );
}

type FileConfig = {
  file: File | null;
  setFile: (file: File) => void;
  removeFile: () => void;
  acceptedTypes: AllowedMemoryType[];
};

type LangConfig = {
  lang: Lang;
  onChange: (lang: Lang) => void;
};

type LangItem = { value: Lang; label: Lang };

type UploadSingleProps = {
  titles: { uploadTitle: string; fileTitle: string };
  file: FileConfig;
  langConfig: {
    sourceLang: LangConfig;
    targetLang: LangConfig;
    langItems: LangItem[];
  };
};

type UploadDoubleProps = {
  source: FileConfig & LangConfig;
  target: FileConfig & LangConfig;
  langItems: LangItem[];
};

function UploadSingle({ file, langConfig, titles }: UploadSingleProps) {
  return (
    <Container className={`relative p-4 grid grid-cols-1 gap-4`}>
      {file.file ? (
        <MemoryFileItem>
          <MemoryFileItem.Header onRemoveFile={file.removeFile} icon={Sheet}>
            {titles.fileTitle}
          </MemoryFileItem.Header>
          <MemoryFileItem.Body>{file.file.name}</MemoryFileItem.Body>
          <MemoryFileItem.Footer>
            <Container className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Source:</span>
              <Combobox
                name="source_language"
                items={langConfig.langItems}
                value={langConfig.sourceLang.lang}
                onChange={langConfig.sourceLang.onChange}
                className="w-full h-9"
              />
            </Container>
            <Container className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Target:</span>
              <Combobox
                name="target_language"
                items={langConfig.langItems}
                value={langConfig.targetLang.lang}
                onChange={langConfig.targetLang.onChange}
                className="w-full h-9"
              />
            </Container>
          </MemoryFileItem.Footer>
        </MemoryFileItem>
      ) : (
        <UploadArea
          type="memory"
          accept={file.acceptedTypes.join(",")}
          title={titles.uploadTitle}
          description={`Allowed file types: ${file.acceptedTypes
            .map((type) => type.slice(1).toUpperCase())
            .join(", ")}. ${
            file.acceptedTypes.includes(".xlsx")
              ? "1st column: source segments, 2nd column: target segments"
              : ""
          }`}
          onFilesSelect={(files) => file.setFile(files[0])}
          className="h-[200px] bg-cat-memory/70 hover:bg-cat-memory"
        />
      )}
    </Container>
  );
}

function UploadDouble({ source, target, langItems }: UploadDoubleProps) {
  return (
    <Container className={`relative p-4 grid grid-cols-2 gap-4`}>
      {source.file ? (
        <MemoryFileItem>
          <MemoryFileItem.Header onRemoveFile={source.removeFile}>
            Source Document
          </MemoryFileItem.Header>
          <MemoryFileItem.Body>{source.file?.name}</MemoryFileItem.Body>
          <MemoryFileItem.Footer>
            <span className="text-sm text-gray-600">Language:</span>
            <Combobox
              name="source_language"
              items={langItems}
              value={source.lang}
              onChange={source.onChange}
              className="w-full h-9"
            />
          </MemoryFileItem.Footer>
        </MemoryFileItem>
      ) : (
        <UploadArea
          type="memory"
          accept={source.acceptedTypes.join(",")}
          title="Source Document"
          description={`Allowed file types: ${source.acceptedTypes
            .map((type) => type.slice(1).toUpperCase())
            .join(", ")}`}
          onFilesSelect={(files) => source.setFile(files[0])}
          className="h-[200px] bg-cat-memory/70 hover:bg-cat-memory"
        />
      )}

      {target.file ? (
        <MemoryFileItem>
          <MemoryFileItem.Header onRemoveFile={target.removeFile}>
            Target Document
          </MemoryFileItem.Header>
          <MemoryFileItem.Body>{target.file?.name}</MemoryFileItem.Body>
          <MemoryFileItem.Footer>
            <span className="text-sm text-gray-600">Language:</span>
            <Combobox
              name="target_language"
              items={langItems}
              value={target.lang}
              onChange={target.onChange}
              className="w-full h-9"
            />
          </MemoryFileItem.Footer>
        </MemoryFileItem>
      ) : (
        <UploadArea
          type="memory"
          accept={target.acceptedTypes.join(",")}
          title="Target Document"
          description={`Allowed file types: ${target.acceptedTypes
            .map((type) => type.slice(1).toUpperCase())
            .join(", ")}`}
          onFilesSelect={(files) => target.setFile(files[0])}
          className="h-[200px] bg-cat-memory/70 hover:bg-cat-memory"
        />
      )}

      <Container className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md">
        <ArrowRight size={28} className="text-gray-500" />
      </Container>
    </Container>
  );
}

UploadTmForm.Header = Header;
UploadTmForm.UploadDouble = UploadDouble;
UploadTmForm.UploadSingle = UploadSingle;

export default UploadTmForm;
