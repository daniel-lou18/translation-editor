import { FileInfo } from "@/pages/Upload";

export default function FileList({ files }: { files: FileInfo[] }) {
  return (
    <>
      {files.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Uploaded Files
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Source Documents
              </h3>
              {files
                .filter((f) => f.type === "document")
                .map((file, index) => (
                  <FileItem
                    key={index}
                    file={file}
                    onRemove={() => removeFile(index)}
                  />
                ))}
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">
                Translation Memory
              </h3>
              {files
                .filter((f) => f.type === "memory")
                .map((file, index) => (
                  <FileItem
                    key={index}
                    file={file}
                    onRemove={() => removeFile(index)}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
