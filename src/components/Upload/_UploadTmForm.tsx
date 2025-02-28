import UploadArea from "@/components/Upload/UploadArea";
import Container from "../ui/Container";
import Overlay from "../ui/Overlay";
import {
  allowedDocumentTypes,
  allowedMemoryTypes,
  languageToCodeMap as languages,
  domains,
} from "@/utils/constants";
import { Lang, Domain } from "@/types";
import { useTmUpload } from "@/hooks/useTmUpload";
import MemoryFileItem from "./MemoryFileItem";


export default function UploadTmForm() {
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

  return (
    <form className="py-8 space-y-12" onSubmit={handleSubmit}>
      <Container className={`grid md:grid-cols-2 gap-6`}>
        <UploadArea
          type="memory"
          accept={allowedDocumentTypes.join(",")}
          title="Source Document"
          description="Allowed file types: TXT, PDF, PNG, JPG, JPEG, BMP, WEBP"
          onFilesSelect={(files) => setSourceFile(files[0])}
        />
        <UploadArea
          type="memory"
          accept={allowedMemoryTypes.join(",")}
          title="Target Document"
          description="Allowed file types: TXT, PDF, PNG, JPG, JPEG, BMP, WEBP"
          onFilesSelect={(files) => setTargetFile(files[0])}
        />
      </Container>
      <MemoryFileItem
        files={{ sourceFile, targetFile }}
        itemData={{
          languages: Object.keys(languages) as Lang[],
          domains: [...domains] as Domain[],
          sourceLang,
          targetLang,
          domain,
        }}
        onRemoveSourceFile={removeSourceFile}
        onRemoveTargetFile={removeTargetFile}
        onSourceLangChange={onSourceLangChange}
        onTargetLangChange={onTargetLangChange}
        onDomainChange={onDomainChange}
        onSwapFiles={onSwapFiles}
      />
      {isLoading && <Overlay />}
    </form>
  );
}
