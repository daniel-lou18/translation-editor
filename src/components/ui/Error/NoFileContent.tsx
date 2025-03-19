import { FileText } from "lucide-react";

type NoDocumentProps = {
  title?: string;
  description?: string;
};

export default function NoContent({
  title = "No Content Found",
  description = "The content you're looking for doesn't exist or has been removed.",
}: NoDocumentProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-muted-foreground mt-2">{description}</p>
    </div>
  );
}
