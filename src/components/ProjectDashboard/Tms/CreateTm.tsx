import UploadTmForm from "@/components/ProjectDashboard/Tms/UploadTmForm";
import Container from "../../ui/Container";
import Combobox from "@/components/ui/Combobox";
import { Earth } from "lucide-react";
import { useTmUpload } from "@/hooks/useTmUpload";
import { useTmFileFormat } from "@/hooks/useTmFileFormat";
import UploadTmTitle from "./UploadTmTitle";

export default function CreateTm() {
  const {
    sourceFile,
    targetFile,
    setSourceFile,
    setTargetFile,
    removeSourceFile,
    removeTargetFile,
    isLoading,
    domain,
    handleSubmit,
    onDomainChange,
    domainItems,
    ...otherProps
  } = useTmUpload();
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
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        buttonText="Create TM"
      >
        <UploadTmForm.Header title="Upload source and target documents to create a new TM">
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
          sourceFile={sourceFile}
          targetFile={targetFile}
          setSourceFile={setSourceFile}
          setTargetFile={setTargetFile}
          removeSourceFile={removeSourceFile}
          removeTargetFile={removeTargetFile}
          {...otherProps}
        />
      </UploadTmForm>
    </UploadTmTitle>
  );
}
