import UploadTmForm from "@/components/ProjectDashboard/Tms/UploadTmForm";
import Container from "../../ui/Container";
import Combobox from "@/components/ui/Combobox";
import { Earth } from "lucide-react";
import { useTmUpload } from "@/hooks/useTmUpload";
import { useTmFileFormat } from "@/hooks/useTmFileFormat";
import UploadTmTitle from "./UploadTmTitle";
import { allowedExcelTypes, allowedMemoryTypes } from "@/types/Files";
import { AllowedMemoryType } from "@/types/Files";
import { useLangsDomain } from "@/hooks/useLangsDomain";
import { useTmExcelUpload } from "@/hooks/useTmExcelUpload";
export default function CreateTm() {
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
    removeSourceFile,
    removeTargetFile,
    isLoading,
    handleSubmit,
    setSourceFile,
    setTargetFile,
  } = useTmUpload({ type: "create", sourceLang, targetLang, domain });
  const {
    file,
    setFile,
    removeFile,
    handleSubmit: handleSubmitExcel,
    isLoading: isLoadingExcel,
  } = useTmExcelUpload({
    type: "create",
    sourceLang,
    targetLang,
    domain,
  });
  const { tmFormat, toggleTmFormat, tmFormats } = useTmFileFormat(
    setSourceFile,
    setTargetFile
  );

  return (
    <UploadTmTitle
      title="Create Translation Memory"
      tmFormat={tmFormat}
      toggleTmFormat={toggleTmFormat}
      tmFormats={tmFormats}
      setSourceFile={setSourceFile}
      setTargetFile={setTargetFile}
    >
      <UploadTmForm
        handleSubmit={tmFormat === "sheet" ? handleSubmitExcel : handleSubmit}
        isLoading={isLoading || isLoadingExcel}
        buttonText="Create TM"
      >
        <UploadTmForm.Header title="Upload source and target segments to create a new TM">
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
            langConfig={{
              sourceLang: {
                lang: sourceLang,
                onChange: (value) => setSourceLang(value),
              },
              targetLang: {
                lang: targetLang,
                onChange: (value) => setTargetLang(value),
              },
              langItems,
            }}
            titles={{
              uploadTitle: "Excel sheet containing source and target segments",
              fileTitle: "Source Document",
            }}
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
