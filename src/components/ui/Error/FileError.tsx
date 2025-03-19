import { FileText } from "lucide-react";

type ErrorProps = {
  title: string;
  error: Error | null;
};

export default function Error({
  title = "Error Loading Data",
  error,
}: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-muted-foreground mt-2">
        {error?.message || "An unknown error occurred while loading the data."}
      </p>
    </div>
  );
}
