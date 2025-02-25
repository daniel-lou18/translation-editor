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
import { useUpload } from "@/hooks/useUpload";

type UploadProps = {
  variant?: "document" | "memory" | "double";
  newProject?: boolean;
};

export default function UploadForm({
  variant = "double",
  newProject = true,
}: UploadProps) {
  const {
    files,
    processFiles,
    removeFile,
    isLoading,
    sourceLang,
    setSourceLang,
    targetLang,
    setTargetLang,
    domain,
    setDomain,
    handleSubmit,
  } = useUpload(newProject);

  return (
    <form className="py-8 space-y-12" onSubmit={handleSubmit}>
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
          languages: Object.keys(languages) as Lang[],
          domains: [...domains] as Domain[],
          sourceLang,
          targetLang,
          domain,
        }}
        onSourceLangChange={(newLang: Lang) => setSourceLang(newLang)}
        onTargetLangChange={(newLang: Lang) => setTargetLang(newLang)}
        onDomainChange={(newDomain: Domain) => setDomain(newDomain)}
      >
        <UploadButton isProcessing={isLoading} />
      </FileList>
      {isLoading && <Overlay />}
    </form>
  );
}
