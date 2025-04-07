import UploadForm from "@/components/ui/Upload/UploadForm";
import Container from "../../ui/Container";
import { Layers, Sheet } from "lucide-react";
import Combobox from "@/components/ui/Combobox";
import { Earth } from "lucide-react";
import { useTmFileFormat } from "@/hooks/useTmFileFormat";
import UploadTitle from "../../ui/Upload/UploadTitle";
import { EXCEL_MIME_TYPES, MIME_TYPES } from "@/types/Files";
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
    <UploadTitle
      title="Add segments to TM"
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
          text: "Add segments",
          disabled:
            isLoading ||
            isLoadingExcel ||
            (tmFormat === "sheet" ? !file : !sourceFile || !targetFile),
        }}
      >
        <UploadForm.Header title="Upload segments to a TM">
          <Container className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-muted-foreground" />
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
