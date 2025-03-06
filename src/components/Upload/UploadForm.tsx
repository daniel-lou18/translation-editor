import FileList from "@/components/Upload/FileList";
import UploadArea from "@/components/Upload/UploadArea";
import UploadButton from "./UploadButton";
import Container from "../ui/Container";
import Overlay from "../ui/Overlay";
import { allowedDocumentTypes, allowedMemoryTypes } from "@/utils/constants";
import { Lang, Domain } from "@/types";
import { useUploadDouble } from "@/hooks/useUploadDouble";

type UploadProps = {
  variant?: "document" | "memory" | "double";
  newProject?: boolean;
};

export default function UploadForm({ variant = "double" }: UploadProps) {
  const {
    sourceFile,
    targetFile,
    sourceLang,
    targetLang,
    domain,
    setSourceFile,
    setTargetFile,
    setSourceLang,
    setTargetLang,
    setDomain,
    domainItems,
    langItems,
  } = useUploadDouble();

  const sourceFileInfo = sourceFile
    ? { file: sourceFile, type: "document" }
    : null;
  const targetFileInfo = targetFile
    ? { file: targetFile, type: "memory" }
    : null;

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
            onFilesSelect={(files) => setSourceFile(files[0])}
          />
        ) : null}
        {variant === "memory" || variant === "double" ? (
          <UploadArea
            type="memory"
            accept={allowedMemoryTypes.join(",")}
            title="Translation Resources"
            description="Allowed file types: TXT, PDF, PNG, JPG, JPEG, BMP, WEBP"
            onFilesSelect={(files) => setTargetFile(files[0])}
          />
        ) : null}
      </Container>
      <FileList
        files={[sourceFileInfo, targetFileInfo]}
        onRemove={() => {}}
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
