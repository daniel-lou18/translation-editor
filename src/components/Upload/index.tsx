import { FormEvent, useState } from "react";
import FileList from "@/components/Upload/FileList";
import UploadArea from "@/components/Upload/UploadArea";
import UploadButton from "./UploadButton";
import { uploadService } from "@/services/uploadService";

export interface FileInfo {
  file: File;
  type: "document" | "memory";
}

export default function Upload() {
  const [files, setFiles] = useState<FileInfo[]>([]);

  function processFiles(newFiles: File[], type: "document" | "memory") {
    const validExtensions = type === "document" ? [".txt"] : [".xlsx", ".xls"];
    const processedFiles = newFiles
      .filter((file) =>
        validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
      )
      .map((file) => ({ file, type }));

    setFiles((prev) => [...prev, ...processedFiles]);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    uploadService.submitSourceText(
      files.filter((file) => file.type === "document")?.[0].file
    );
  }

  return (
    <form className="min-h-screen p-8" onSubmit={handleSubmit}>
      <div className="max-w-6xl mx-auto p-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Start a new translation
          </h1>
          <p className="text-muted-foreground">
            Upload your source and translation files
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <UploadArea
            type="document"
            accept=".txt"
            title="Source Documents"
            description="Upload .txt files for translation"
            onFilesSelect={(files) => processFiles(files, "document")}
          />
          <UploadArea
            type="memory"
            accept=".xlsx,.xls"
            title="Translation Memory"
            description="Upload Excel files containing translation memory"
            onFilesSelect={(files) => processFiles(files, "memory")}
          />
        </div>
        <FileList files={files} handleRemove={removeFile}>
          <UploadButton isProcessing={false} />
        </FileList>
      </div>
    </form>
  );
}
