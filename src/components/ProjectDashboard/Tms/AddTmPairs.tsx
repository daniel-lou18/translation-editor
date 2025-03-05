import UploadTmForm from "@/components/ProjectDashboard/Tms/UploadTmForm";
import Container from "../../ui/Container";
import { BookType } from "lucide-react";
import Combobox from "@/components/ui/Combobox";
import { Earth } from "lucide-react";
import { useAddTmSegments } from "@/hooks/useTmSegmentUpload";
import { useTmFileFormat } from "@/hooks/useTmFileFormat";
import UploadTmTitle from "./UploadTmTitle";
import { allowedMemoryTypes } from "@/utils/constants";
import { AllowedMemoryType } from "@/types/Files";
export default function AddTmPairs() {
  const {
    sourceFile,
    targetFile,
    setSourceFile,
    setTargetFile,
    removeSourceFile,
    removeTargetFile,
    isLoading,
    handleSubmit,
    onDomainChange,
    tmItems,
    tmId,
    onTmChange,
    domain,
    domainItems,
    sourceLang,
    targetLang,
    onSourceLangChange,
    onTargetLangChange,
    langItems,
  } = useAddTmSegments();
  const { tmFormat, toggleTmFormat, tmFormats } = useTmFileFormat(
    setSourceFile,
    setTargetFile
  );

  return (
    <UploadTmTitle
      title="Add segments to TM"
      tmFormat={tmFormat}
      toggleTmFormat={toggleTmFormat}
      tmFormats={tmFormats}
      setSourceFile={setSourceFile}
      setTargetFile={setTargetFile}
    >
      <UploadTmForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        buttonText="Add segments"
      >
        <UploadTmForm.Header title="Upload source and target segments from documents to your TM">
          <Container className="flex items-center gap-2">
            <BookType className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">TM:</span>
            <Combobox
              name="tm"
              items={tmItems}
              value={tmId}
              onChange={onTmChange}
              className="w-80 h-8"
            />
          </Container>

          <Container className="flex items-center gap-2">
            <Earth className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Domain:</span>
            <Combobox
              name="domain"
              items={domainItems}
              value={domain}
              onChange={onDomainChange}
              className="w-48 h-8"
            />
          </Container>
        </UploadTmForm.Header>
        <UploadTmForm.Upload
          variant={tmFormat === "sheet" ? "single" : "double"}
          source={{
            file: sourceFile,
            setFile: setSourceFile,
            removeFile: removeSourceFile,
            lang: sourceLang,
            onChange: onSourceLangChange,
            acceptedTypes: [...allowedMemoryTypes] as AllowedMemoryType[],
          }}
          target={{
            file: targetFile,
            setFile: setTargetFile,
            removeFile: removeTargetFile,
            lang: targetLang,
            onChange: onTargetLangChange,
            acceptedTypes: [...allowedMemoryTypes] as AllowedMemoryType[],
          }}
          langItems={langItems}
        />
      </UploadTmForm>
    </UploadTmTitle>
  );
}
