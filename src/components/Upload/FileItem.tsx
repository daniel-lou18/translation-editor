export default function FileItem({
  file,
  onRemove,
}: {
  file: FileInfo;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-cat-target hover:bg-cat-target/70 transition-colors">
      <div className="flex items-center gap-3">
        {file.type === "document" ? (
          <FileText className="w-5 h-5 text-cat-accent" />
        ) : (
          <FileSpreadsheet className="w-5 h-5 text-cat-accent" />
        )}
        <span className="text-sm font-medium">{file.file.name}</span>
      </div>
      <button
        onClick={onRemove}
        className="p-1 hover:bg-cat-accent/10 rounded-full transition-colors"
      >
        <X className="w-4 h-4 text-muted-foreground" />
      </button>
    </div>
  );
}
