import { FormEvent, useState } from "react";
import FileList from "@/components/Upload/FileList";
import UploadArea from "@/components/Upload/UploadArea";
import UploadButton from "./UploadButton";
import Container from "../ui/Container";
import { useFileManager } from "@/hooks/useFileManager";
import { useSubmitFiles } from "@/hooks/useSubmitFiles";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import Overlay from "../ui/Overlay";
import { languageToCodeMap as languages } from "@/utils/constants";
import { Lang } from "@/types";

type UploadProps = {
  variant?: "document" | "memory" | "double";
};

export default function Upload({ variant = "double" }: UploadProps) {
  const { files, processFiles, removeFile } = useFileManager();
  const { mutate, isLoading } = useSubmitFiles();
  const { navigateToTranslation } = useTranslationRoute();
  const [sourceLang, setSourceLang] = useState<Lang>("English (USA)");
  const [targetLang, setTargetLang] = useState<Lang>("French (France)");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(files, {
      onSuccess: (params) => navigateToTranslation(params),
      onError: (error) => console.log(error),
    });
  }

  return (
    <form className="min-h-screen p-8" onSubmit={handleSubmit}>
      <Container className="max-w-6xl mx-auto p-8 space-y-8">
        <Container className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Start a new translation
          </h1>
          <p className="text-muted-foreground">
            Upload the document you want to translate, together with its TM
            files
          </p>
        </Container>

        <Container
          className={`grid ${
            variant === "double" ? "md:grid-cols-2" : ""
          } gap-6`}
        >
          {variant === "document" || variant === "double" ? (
            <UploadArea
              type="document"
              accept=".txt"
              title="Source Documents"
              description="Upload docx or txt files for translation"
              onFilesSelect={(files) => processFiles(files, "document")}
            />
          ) : null}
          {variant === "memory" || variant === "double" ? (
            <UploadArea
              type="memory"
              accept=".xlsx,.xls,.txt"
              title="Translation Memory"
              description="Upload txt, xlsx or tmx files containing translation memory segments"
              onFilesSelect={(files) => processFiles(files, "memory")}
            />
          ) : null}
        </Container>
        <FileList
          files={files}
          onRemove={removeFile}
          langData={{
            languages: Object.keys(languages) as Lang[],
            sourceLang,
            targetLang,
          }}
          onSourceLangChange={(newLang: Lang) => setSourceLang(newLang)}
          onTargetLangChange={(newLang: Lang) => setTargetLang(newLang)}
        >
          <UploadButton isProcessing={isLoading} />
        </FileList>
      </Container>
      {isLoading && <Overlay />}
    </form>
  );
}
