import FileList from "@/components/Upload/FileList";
import UploadArea from "@/components/Upload/UploadArea";
import UploadButton from "./UploadButton";
import Overlay from "../ui/Overlay";
import {
  allowedDocumentTypes,
  languageToCodeMap as languages,
  domains,
} from "@/utils/constants";
import { Lang, Domain } from "@/types";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";

type UploadDocumentProps = {
  newProject?: boolean;
};

export default function UploadDocumentForm({
  newProject = true,
}: UploadDocumentProps) {
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
    domainItems,
    langItems,
  } = useDocumentUpload(newProject);

  return (
    <form className="py-8 space-y-12" onSubmit={handleSubmit}>
      <UploadArea
        type="document"
        accept={allowedDocumentTypes.join(",")}
        title="Source Document"
        description={`Allowed file types: ${allowedDocumentTypes
          .map((type) => `${type.slice(1).toUpperCase()}`)
          .join(", ")}`}
        onFilesSelect={(files) => processFiles(files, "document")}
      />
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
        <UploadButton isProcessing={isLoading}>Translate</UploadButton>
      </FileList>
      {isLoading && <Overlay />}
    </form>
  );
}
