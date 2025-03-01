import UploadTmForm from "@/components/Upload/UploadTmForm";
import Container from "../../ui/Container";
import PageTitle from "../../ui/PageTitle";
import { BookType } from "lucide-react";
import Combobox from "@/components/ui/Combobox";
import { Earth } from "lucide-react";
import { useAddTmSegments } from "@/hooks/useTmSegmentUpload";

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
    onSourceLangChange,
    onTargetLangChange,
    onDomainChange,
    tmItems,
    tmId,
    onTmChange,
    sourceLang,
    targetLang,
    domain,
    domainItems,
  } = useAddTmSegments();

  return (
    <Container>
      <PageTitle title="Add segments to TM" />
      <UploadTmForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        buttonText="Add segments"
      >
        <UploadTmForm.Header title="Upload source and target segments from documents to your TM">
          <div className="flex items-center gap-2">
            <BookType className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">TM:</span>
            <Combobox
              name="tm"
              items={tmItems}
              value={tmId}
              onChange={onTmChange}
              className="w-80 h-8"
            />
          </div>

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
