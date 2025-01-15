import { useState } from "react";
import { useTranslationRoute } from "./useTranslationRoute";
import { exportService } from "@/services/exportService";

export function useExportTranslation() {
  const { projectId, translationId } = useTranslationRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function downloadFile() {
    try {
      setIsLoading(true);
      setError("");

      if (!projectId || !translationId) {
        throw new Error("Project or translation id is missing");
      }

      const { data, fileName } = await exportService.exportTranslation(
        projectId,
        translationId,
        "txt"
      );

      const downloadUrl = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      console.error("Error while exporting translation: ", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { downloadFile, isLoading, error };
}
