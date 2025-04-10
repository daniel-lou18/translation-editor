import Container from "@/components/ui/Container";
import { CheckCheck } from "lucide-react";
import { CloudUpload } from "lucide-react";

export default function SyncStatus({ isSaving }: { isSaving: boolean }) {
  return (
    <Container
      className={`h-8 w-8 rounded-md flex items-center justify-center border ${
        isSaving ? "border-border bg-muted" : "border-emerald-300 bg-emerald-50"
      }`}
    >
      {isSaving ? (
        <CloudUpload className="w-4 h-4 animate-pulse" />
      ) : (
        <CheckCheck className="w-4 h-4 text-emerald-500" />
      )}
    </Container>
  );
}
