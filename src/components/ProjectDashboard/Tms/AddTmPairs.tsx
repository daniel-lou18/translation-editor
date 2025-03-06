import UploadTmForm from "@/components/ProjectDashboard/Tms/UploadTmForm";
import Container from "../../ui/Container";
import { BookType } from "lucide-react";
import Combobox from "@/components/ui/Combobox";
import { Earth } from "lucide-react";
import { useTmFileFormat } from "@/hooks/useTmFileFormat";
import UploadTmTitle from "./UploadTmTitle";
import { allowedExcelTypes, allowedMemoryTypes } from "@/utils/constants";
import { AllowedMemoryType } from "@/types/Files";
import { useSelectTm } from "@/hooks/useSelectTm";
import { useTmUpload } from "@/hooks/useTmUpload";
import { useTmExcelUpload } from "@/hooks/useTmExcelUpload";
import { useLangsDomain } from "@/hooks/useLangsDomain";

export default function AddTmPairs() {
  const { tmItems, tmId, onTmChange } = useSelectTm();
  const {
    sourceLang,
    targetLang,
    domain,
    domainItems,
    langItems,
    setSourceLang,
    setTargetLang,
    setDomain,
  } = useLangsDomain();
  const {
    sourceFile,
    targetFile,
    setSourceFile,
    setTargetFile,
    removeSourceFile,
    removeTargetFile,
    isLoading,
    handleSubmit,
  } = useTmUpload({ type: "add", tmId, sourceLang, targetLang, domain });
  const {
    file,
    setFile,
    removeFile,
    isLoading: isLoadingExcel,
    handleSubmit: handleSubmitExcel,
  } = useTmExcelUpload({ type: "add", tmId, sourceLang, targetLang, domain });

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
        handleSubmit={tmFormat === "sheet" ? handleSubmitExcel : handleSubmit}
        isLoading={isLoading || isLoadingExcel}
        buttonText="Add segments"
      >
        <UploadTmForm.Header title="Upload segments to a TM">
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
              onChange={(value) => setDomain(value)}
              className="w-48 h-8"
            />
          </Container>
        </UploadTmForm.Header>

        {tmFormat === "sheet" ? (
          <UploadTmForm.UploadSingle
            file={{
              file,
              setFile,
              removeFile,
              acceptedTypes: [...allowedExcelTypes] as AllowedMemoryType[],
            }}
            sourceLang={{
              lang: sourceLang,
              onChange: (value) => setSourceLang(value),
            }}
            targetLang={{
              lang: targetLang,
              onChange: (value) => setTargetLang(value),
            }}
            langItems={langItems}
          />
        ) : (
          <UploadTmForm.UploadDouble
            source={{
              file: sourceFile,
              setFile: setSourceFile,
              removeFile: removeSourceFile,
              lang: sourceLang,
              onChange: (value) => setSourceLang(value),
              acceptedTypes: [...allowedMemoryTypes] as AllowedMemoryType[],
            }}
            target={{
              file: targetFile,
              setFile: setTargetFile,
              removeFile: removeTargetFile,
              lang: targetLang,
              onChange: (value) => setTargetLang(value),
              acceptedTypes: [...allowedMemoryTypes] as AllowedMemoryType[],
            }}
            langItems={langItems}
          />
        )}
      </UploadTmForm>
    </UploadTmTitle>
  );
}
