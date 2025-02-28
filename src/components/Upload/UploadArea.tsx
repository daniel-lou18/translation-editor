import { cn } from "@/lib/utils";
import { BookType, FileText } from "lucide-react";
import { useState } from "react";
import Container from "../ui/Container";

type UploadAreaProps = {
  type: "document" | "memory";
  accept: string;
  title: string;
  description: string;
  onFilesSelect: (files: File[]) => void;
  className?: string;
};

export default function UploadArea({
  type,
  accept,
  title,
  description,
  onFilesSelect,
  className,
}: UploadAreaProps) {
  const [draggingArea, setDraggingArea] = useState<
    "document" | "memory" | null
  >(null);

  const handleDragOver = (e: React.DragEvent, type: "document" | "memory") => {
    e.preventDefault();
    setDraggingArea(type);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggingArea(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggingArea(null);

    const droppedFiles = Array.from(e.dataTransfer.files);
    onFilesSelect(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      onFilesSelect(selectedFiles);
    }
  };

  return (
    <Container
      onDragOver={(e) => handleDragOver(e, type)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e)}
      className={cn(
        "border-2 border-dashed rounded-lg p-6 transition-all duration-200",
        "bg-cat-target/70 hover:bg-cat-target",
        draggingArea === type && "border-cat-accent bg-cat-accent/10",
        "flex flex-col items-center justify-center gap-3 h-[300px]",
        className
      )}
    >
      <Container className="w-12 h-12 rounded-full bg-cat-accent/10 flex items-center justify-center">
        {type === "document" ? (
          <FileText className="w-6 h-6 text-cat-accent" />
        ) : (
          <BookType className="w-6 h-6 text-cat-accent" />
        )}
      </Container>

      <Container className="text-center">
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </Container>

      <label className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer">
        <input
          type="file"
          className="hidden"
          multiple
          accept={accept}
          onChange={(e) => handleFileInput(e)}
        />
        Select File
      </label>
    </Container>
  );
}
