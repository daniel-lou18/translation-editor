import Container from "../../ui/Container";
import PageTitle from "../../ui/PageTitle";
import UploadForm from "../../ui/Upload/UploadForm";
import { MIME_TYPES } from "@/types/Files";
import Combobox from "@/components/ui/Combobox";
import { useLangsDomain } from "@/hooks/useLangsDomain";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";
import { Earth, FileText, Layers } from "lucide-react";
import { useSelectTm } from "@/hooks/useSelectTm";

export type UploadDocumentProps = {
  mode: "ai" | "manual";
};

export default function UploadDocument({
  mode = "manual",
}: UploadDocumentProps) {
  const { tmItems, tmId, onTmChange } = useSelectTm();
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
      tmId,
      mode,
    });

  return (
    <Container>
      <PageTitle
        title={mode === "ai" ? "Translate with AI" : "Start new translation"}
      />
      <UploadForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        buttonConfig={{
          text: "Translate",
          disabled: isLoading,
        }}
      >
        <UploadForm.Header title="Upload source document to translate">
          {mode === "ai" && (
            <Container className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">TM:</span>
              <Combobox
                name="tm"
                items={tmItems}
                value={tmId}
                onChange={onTmChange}
                className="w-80 h-8"
              />
            </Container>
          )}

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

        <UploadForm.UploadSingle
          file={{
            file,
            setFile,
            removeFile,
            acceptedTypes: [...MIME_TYPES],
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
            uploadTitle: "Source Document",
            fileTitle: "Source Document",
          }}
        />
      </UploadForm>
    </Container>
  );
}
