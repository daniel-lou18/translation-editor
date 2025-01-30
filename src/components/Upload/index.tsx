import { FormEvent } from "react";
import FileList from "@/components/Upload/FileList";
import UploadArea from "@/components/Upload/UploadArea";
import UploadButton from "./UploadButton";
import Container from "../ui/Container";
import { useFileManager } from "@/hooks/useFileManager";
import { useSubmitFiles } from "@/hooks/useSubmitFiles";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import Overlay from "../ui/Overlay";

export default function Upload() {
  const { files, processFiles, removeFile } = useFileManager();
  const { mutate, isLoading } = useSubmitFiles();
  const { navigateToTranslation } = useTranslationRoute();

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

        <Container className="grid md:grid-cols-2 gap-6">
          <UploadArea
            type="document"
            accept=".txt"
            title="Source Documents"
            description="Upload docx or txt files for translation"
            onFilesSelect={(files) => processFiles(files, "document")}
          />
          <UploadArea
            type="memory"
            accept=".xlsx,.xls,.txt"
            title="Translation Memory"
            description="Upload txt, xlsx or tmx files containing translation memory segments"
            onFilesSelect={(files) => processFiles(files, "memory")}
          />
        </Container>
        <FileList files={files} handleRemove={removeFile}>
          <UploadButton isProcessing={isLoading} />
        </FileList>
      </Container>
      {isLoading && <Overlay />}
    </form>
  );
}
