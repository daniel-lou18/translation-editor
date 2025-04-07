import UploadForm from "@/components/ui/Upload/UploadForm";
import Container from "../../ui/Container";
import Combobox from "@/components/ui/Combobox";
import { Earth, Sheet } from "lucide-react";
import { useTmUpload } from "@/hooks/useTmUpload";
import { useTmFileFormat } from "@/hooks/useTmFileFormat";
import UploadTitle from "../../ui/Upload/UploadTitle";
import { EXCEL_MIME_TYPES, MIME_TYPES } from "@/types/Files";
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
    <UploadTitle
      title="Create Translation Memory"
      tmFormat={tmFormat}
      toggleTmFormat={toggleTmFormat}
      tmFormats={tmFormats}
      setSourceFile={setSourceFile}
      setTargetFile={setTargetFile}
    >
      <UploadForm
        handleSubmit={tmFormat === "sheet" ? handleSubmitExcel : handleSubmit}
        isLoading={isLoading || isLoadingExcel}
        buttonConfig={{
          text: "Create TM",
          disabled:
            isLoading ||
            isLoadingExcel ||
            (tmFormat === "sheet" ? !file : !sourceFile || !targetFile),
        }}
      >
        <UploadForm.Header title="Upload source and target segments to create a new TM">
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
        </UploadForm.Header>

        {tmFormat === "sheet" ? (
          <UploadForm.UploadSingle
            file={{
              file,
              setFile,
              removeFile,
              acceptedTypes: [...EXCEL_MIME_TYPES],
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
            content={{
              uploadTitle: "Excel sheet containing source and target segments",
              fileTitle: "Source Document",
              uploadInstructions:
                "1st column: source segments, 2nd column: target segments",
              icon: Sheet,
            }}
          />
        ) : (
          <UploadForm.UploadDouble
            source={{
              file: sourceFile,
              setFile: setSourceFile,
              removeFile: removeSourceFile,
              lang: sourceLang,
              onChange: (value) => setSourceLang(value),
              acceptedTypes: [...MIME_TYPES],
            }}
            target={{
              file: targetFile,
              setFile: setTargetFile,
              removeFile: removeTargetFile,
              lang: targetLang,
              onChange: (value) => setTargetLang(value),
              acceptedTypes: [...MIME_TYPES],
            }}
            langItems={langItems}
          />
        )}
      </UploadForm>
    </UploadTitle>
  );
}
