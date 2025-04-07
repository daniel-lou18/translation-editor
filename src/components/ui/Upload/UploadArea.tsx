import { cn } from "@/lib/utils";
import { ComponentType, useState } from "react";
import Container from "../Container";
import { LucideIcon, FileText } from "lucide-react";

type UploadAreaProps = {
  accept: string;
  title: string;
  description: string;
  onFilesSelect: (files: File[]) => void;
  icon?: LucideIcon | ComponentType<{ className?: string }>;
  className?: string;
};

export default function UploadArea({
  accept,
  title,
  description,
  onFilesSelect,
  icon: Icon = FileText,
  className,
}: UploadAreaProps) {
  const [draggingArea, setDraggingArea] = useState<"active" | "inactive">(
    "inactive"
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggingArea("active");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggingArea("inactive");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggingArea("inactive");

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
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "bg-gradient-to-br from-muted/50 to-cat-memory border-2 border-dashed border-muted-foreground/30 hover:to-purple-50 hover:border-muted-foreground/50 transition-all duration-200 rounded-lg",
        draggingArea === "active" &&
          "from-muted to-purple-100 border-muted-foreground/50",
        "flex flex-col items-center justify-center gap-3 min-h-[250px]",
        className
      )}
    >
      <Container className="w-12 h-12 rounded-full bg-cat-accent/10 flex items-center justify-center">
        {<Icon className="w-6 h-6 text-primary" />}
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
