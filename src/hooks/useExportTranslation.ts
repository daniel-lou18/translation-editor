import { useState } from "react";
import { useRoute } from "./useRoute";
import { ExportFormat, exportService } from "@/services/exportService";
import { toast } from "sonner";

export function useExportTranslation() {
  const { translationId } = useRoute();
  const [error, setError] = useState("");
  const [filesDownloading, setFilesDownloading] = useState<Set<string>>(
    new Set()
  );

  async function downloadFile(format: ExportFormat, id?: string) {
    const currentId = id ?? translationId;
    let toastId: string | number = "";

    try {
      if (!currentId) {
        throw new Error("Translation id is missing");
      }

      setFilesDownloading((prev) => {
        const set = new Set(prev);
        set.add(currentId);
        return set;
      });
      toastId = toast.loading("Downloading file...");
      setError("");

      const { data, fileName } = await exportService.exportTranslation(
        currentId,
        format
      );

      const downloadUrl = window.URL.createObjectURL(data);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      link.click();

      window.URL.revokeObjectURL(downloadUrl);
      toast.success("File downloaded successfully", {
        classNames: { toast: "bg-green-100" },
      });
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      console.error("Error while exporting translation: ", error);
      toast.error("Error while exporting translation", {
        classNames: { toast: "bg-red-100" },
      });
      setError(error.message);
    } finally {
      toast.dismiss(toastId);
      if (!currentId) {
        return;
      }

      setFilesDownloading((prev) => {
        const set = new Set(prev);
        set.delete(currentId);
        return set;
      });
    }
  }

  return { downloadFile, filesDownloading, error };
}
