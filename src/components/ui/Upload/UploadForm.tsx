import UploadArea from "@/components/ui/Upload/UploadArea";
import Overlay from "../Overlay";
import { Lang } from "@/types";
import FileItem from "./FileItem";
import { ArrowRight, LucideIcon, Sheet } from "lucide-react";
import UploadButton from "./UploadButton";
import Container from "../Container";
import { ComponentType, PropsWithChildren } from "react";
import { MimeType, MimeTypeToFileTypeMap } from "@/types/Files";
import Combobox from "@/components/ui/Combobox";

type UploadFormProps = PropsWithChildren<{
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
  buttonText?: string;
}>;

function createDescription(acceptedTypes: MimeType[], additionalText?: string) {
  return `Allowed file types: ${acceptedTypes
    .map((type) => MimeTypeToFileTypeMap[type])
    .join(", ")}. ${additionalText || ""}`;
}

function UploadForm({
  children,
  handleSubmit,
  isLoading,
  buttonText = "Upload",
}: UploadFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      <Container className="my-8 rounded-lg border border-border bg-card overflow-hidden">
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
    <Container className="px-4 py-3 flex items-center justify-between border-b border-gray-200 bg-muted">
      <h3 className="text-sm font-medium">{title}</h3>
      <Container className="flex items-center gap-6">{children}</Container>
    </Container>
  );
}

type FileConfig = {
  file: File | null;
  setFile: (file: File) => void;
  removeFile: () => void;
  acceptedTypes: MimeType[];
};

type LangConfig = {
  lang: Lang;
  onChange: (lang: Lang) => void;
};

type LangItem = { value: Lang; label: Lang };

type Content = {
  uploadTitle: string;
  fileTitle: string;
  uploadInstructions?: string;
  icon?: LucideIcon | ComponentType<{ className?: string }>;
};

type UploadSingleProps = {
  content: Content;
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

function UploadSingle({ file, langConfig, content }: UploadSingleProps) {
  return (
    <Container className={`relative p-6 grid grid-cols-1 gap-4`}>
      {file.file ? (
        <FileItem>
          <FileItem.Header onRemoveFile={file.removeFile} icon={Sheet}>
            {content.fileTitle}
          </FileItem.Header>
          <FileItem.Body>{file.file.name}</FileItem.Body>
          <FileItem.Footer>
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
          </FileItem.Footer>
        </FileItem>
      ) : (
        <UploadArea
          accept={file.acceptedTypes.join(",")}
          title={content.uploadTitle}
          description={createDescription(
            file.acceptedTypes,
            content.uploadInstructions
          )}
          onFilesSelect={(files) => file.setFile(files[0])}
          className="h-[200px]"
          icon={content.icon}
        />
      )}
    </Container>
  );
}

function UploadDouble({ source, target, langItems }: UploadDoubleProps) {
  return (
    <Container className={`relative p-4 grid grid-cols-2 gap-4`}>
      {source.file ? (
        <FileItem>
          <FileItem.Header onRemoveFile={source.removeFile}>
            Source Document
          </FileItem.Header>
          <FileItem.Body>{source.file?.name}</FileItem.Body>
          <FileItem.Footer>
            <span className="text-sm text-gray-600">Language:</span>
            <Combobox
              name="source_language"
              items={langItems}
              value={source.lang}
              onChange={source.onChange}
              className="w-full h-9"
            />
          </FileItem.Footer>
        </FileItem>
      ) : (
        <UploadArea
          accept={source.acceptedTypes.join(",")}
          title="Source Document"
          description={createDescription(source.acceptedTypes)}
          onFilesSelect={(files) => source.setFile(files[0])}
          className="h-[200px]"
        />
      )}

      {target.file ? (
        <FileItem>
          <FileItem.Header onRemoveFile={target.removeFile}>
            Target Document
          </FileItem.Header>
          <FileItem.Body>{target.file?.name}</FileItem.Body>
          <FileItem.Footer>
            <span className="text-sm text-gray-600">Language:</span>
            <Combobox
              name="target_language"
              items={langItems}
              value={target.lang}
              onChange={target.onChange}
              className="w-full h-9"
            />
          </FileItem.Footer>
        </FileItem>
      ) : (
        <UploadArea
          accept={target.acceptedTypes.join(",")}
          title="Target Document"
          description={createDescription(target.acceptedTypes)}
          onFilesSelect={(files) => target.setFile(files[0])}
          className="h-[200px]"
        />
      )}

      <Container className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
        <ArrowRight size={32} className="text-gray-500" />
      </Container>
    </Container>
  );
}

UploadForm.Header = Header;
UploadForm.UploadDouble = UploadDouble;
UploadForm.UploadSingle = UploadSingle;

export default UploadForm;
