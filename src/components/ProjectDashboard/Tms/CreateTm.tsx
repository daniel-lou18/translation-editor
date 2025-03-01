import UploadTmForm from "@/components/Upload/UploadTmForm";
import Container from "../../ui/Container";
import PageTitle from "../../ui/PageTitle";
import Combobox from "@/components/ui/Combobox";
import { Earth } from "lucide-react";
import { useTmUpload } from "@/hooks/useTmUpload";

export default function CreateTm() {
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
    domainItems,
  } = useTmUpload();

  return (
    <Container>
      <PageTitle title="Create new translation memory" />
      <UploadTmForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        buttonText="Create TM"
      >
        <UploadTmForm.Header title="Upload source and target documents to create a new TM">
          <div className="flex items-center gap-2">
            <Earth className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Domain:</span>
            <Combobox
              name="domain"
              items={domainItems}
              value={domain}
              onChange={onDomainChange}
              className="w-48 h-8"
            />
          </div>
        </UploadTmForm.Header>

        <UploadTmForm.Upload
          sourceFile={sourceFile}
          targetFile={targetFile}
          setSourceFile={setSourceFile}
          setTargetFile={setTargetFile}
          removeSourceFile={removeSourceFile}
          removeTargetFile={removeTargetFile}
          sourceLang={sourceLang}
          targetLang={targetLang}
          onSourceLangChange={onSourceLangChange}
          onTargetLangChange={onTargetLangChange}
        />
      </UploadTmForm>
    </Container>
  );
}
