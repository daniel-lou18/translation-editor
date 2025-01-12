import { useState } from "react";
import FileList from "@/components/Upload/FileList";
import UploadArea from "@/components/Upload/UploadArea";

export interface FileInfo {
  file: File;
  type: "document" | "memory";
}

export default function UploadPage() {
  const [files, setFiles] = useState<FileInfo[]>([]);

  const processFiles = (newFiles: File[], type: "document" | "memory") => {
    const validExtensions = type === "document" ? [".txt"] : [".xlsx", ".xls"];
    const processedFiles = newFiles
      .filter((file) =>
        validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
      )
      .map((file) => ({ file, type }));

    setFiles((prev) => [...prev, ...processedFiles]);
  };

  // const removeFile = (index: number) => {
  //   setFiles((prev) => prev.filter((_, i) => i !== index));
  // };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">CAT Tool</h1>
          <p className="text-muted-foreground">
            Upload your documents and translation memory files
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

        <FileList files={files} />
      </div>
    </div>
  );
}
