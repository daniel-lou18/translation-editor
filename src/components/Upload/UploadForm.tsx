import FileList from "@/components/Upload/FileList";
import UploadArea from "@/components/Upload/UploadArea";
import UploadButton from "./UploadButton";
import Container from "../ui/Container";
import Overlay from "../ui/Overlay";
import { languageToCodeMap as languages } from "@/utils/constants";
import { Lang } from "@/types";
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
            accept=".txt"
            title="Source Documents"
            description="Upload docx or txt files for translation"
            onFilesSelect={(files) => processFiles(files, "document")}
          />
        ) : null}
        {variant === "memory" || variant === "double" ? (
          <UploadArea
            type="memory"
            accept=".xlsx,.xls,.txt"
            title="Translation Memory"
            description="Upload txt, xlsx or tmx files containing translation memory segments"
            onFilesSelect={(files) => processFiles(files, "memory")}
          />
        ) : null}
      </Container>
      <FileList
        files={files}
        onRemove={removeFile}
        langData={{
          languages: Object.keys(languages) as Lang[],
          sourceLang,
          targetLang,
        }}
        onSourceLangChange={(newLang: Lang) => setSourceLang(newLang)}
        onTargetLangChange={(newLang: Lang) => setTargetLang(newLang)}
      >
        <UploadButton isProcessing={isLoading} />
      </FileList>
      {isLoading && <Overlay />}
    </form>
  );
}
