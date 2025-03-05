import FileList from "@/components/Upload/FileList";
import UploadArea from "@/components/Upload/UploadArea";
import UploadButton from "./UploadButton";
import Container from "../ui/Container";
import Overlay from "../ui/Overlay";
import {
  allowedDocumentTypes,
  allowedMemoryTypes,
  languageToCodeMap as languages,
  domains,
} from "@/utils/constants";
import { Lang, Domain } from "@/types";
import { useUploadSingle } from "@/hooks/useUploadSingle";

type UploadProps = {
  variant?: "document" | "memory" | "double";
  newProject?: boolean;
};

export default function UploadForm({ variant = "double" }: UploadProps) {
  const {
    files,
    processFiles,
    removeFile,
    sourceLang,
    setSourceLang,
    targetLang,
    setTargetLang,
    domain,
    setDomain,
    langItems,
    domainItems,
  } = useUploadSingle();

  return (
    <form className="py-8 space-y-12" onSubmit={() => undefined}>
      <Container
        className={`grid ${variant === "double" ? "md:grid-cols-2" : ""} gap-6`}
      >
        {variant === "document" || variant === "double" ? (
          <UploadArea
            type="document"
            accept={allowedDocumentTypes.join(",")}
            title="Source Document"
            description="Allowed file types: TXT, PDF, PNG, JPG, JPEG, BMP, WEBP"
            onFilesSelect={(files) => processFiles(files, "document")}
          />
        ) : null}
        {variant === "memory" || variant === "double" ? (
          <UploadArea
            type="memory"
            accept={allowedMemoryTypes.join(",")}
            title="Translation Resources"
            description="Allowed file types: TXT, PDF, PNG, JPG, JPEG, BMP, WEBP"
            onFilesSelect={(files) => processFiles(files, "memory")}
          />
        ) : null}
      </Container>
      <FileList
        files={files}
        onRemove={removeFile}
        itemData={{
          langItems,
          domainItems,
          sourceLang,
          targetLang,
          domain,
        }}
        onSourceLangChange={(newLang: Lang) => setSourceLang(newLang)}
        onTargetLangChange={(newLang: Lang) => setTargetLang(newLang)}
        onDomainChange={(newDomain: Domain) => setDomain(newDomain)}
      >
        <UploadButton isProcessing={false}>Upload</UploadButton>
      </FileList>
      {false && <Overlay />}
    </form>
  );
}
