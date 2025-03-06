import FileList from "@/components/Upload/FileList";
import UploadArea from "@/components/Upload/UploadArea";
import UploadButton from "./UploadButton";
import Overlay from "../ui/Overlay";
import { allowedDocumentTypes } from "@/utils/constants";
import { Lang, Domain } from "@/types";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";
import { useLangsDomain } from "@/hooks/useLangsDomain";

type UploadDocumentProps = {
  newProject?: boolean;
};

export default function UploadDocumentForm({
  newProject = true,
}: UploadDocumentProps) {
  const {
    sourceLang,
    targetLang,
    domain,
    setSourceLang,
    setTargetLang,
    setDomain,
    domainItems,
    langItems,
  } = useLangsDomain();
  const { file, setFile, removeFile, isLoading, handleSubmit } =
    useDocumentUpload({
      sourceLang,
      targetLang,
      domain,
      newProject,
    });

  return (
    <form className="py-8 space-y-12" onSubmit={handleSubmit}>
      <UploadArea
        type="document"
        accept={allowedDocumentTypes.join(",")}
        title="Source Document"
        description={`Allowed file types: ${allowedDocumentTypes
          .map((type) => `${type.slice(1).toUpperCase()}`)
          .join(", ")}`}
        onFilesSelect={(files) => setFile(files[0])}
      />
      {file ? (
        <FileList
          files={[{ file, type: "document" }]}
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
      ) : null}
      {isLoading && <Overlay />}
    </form>
  );
}
