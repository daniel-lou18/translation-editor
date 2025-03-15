import Container from "../../ui/Container";
import PageTitle from "../../ui/PageTitle";
import UploadTmForm from "../Tms/UploadTmForm";
import { allowedDocumentTypes } from "@/utils/constants";
import { AllowedDocumentType } from "@/types/Files";
import Combobox from "@/components/ui/Combobox";
import { useLangsDomain } from "@/hooks/useLangsDomain";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";
import { BookType, Earth } from "lucide-react";
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
      <UploadTmForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        buttonText="Translate"
      >
        <UploadTmForm.Header title="Upload source document to translate">
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

        <UploadTmForm.UploadSingle
          file={{
            file,
            setFile,
            removeFile,
            acceptedTypes: [...allowedDocumentTypes] as AllowedDocumentType[],
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
            uploadTitle: "Source Document",
            fileTitle: "Source Document",
          }}
        />
      </UploadTmForm>
    </Container>
  );
}
