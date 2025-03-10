import { useState } from "react";
import { useTranslationRoute } from "./useTranslationRoute";
import { exportService } from "@/services/exportService";
import { ExportFileType } from "@/types";

export function useExportTranslation() {
  const { translationId } = useTranslationRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function downloadFile(format: ExportFileType) {
    try {
      setIsLoading(true);
      setError("");

      if (!translationId) {
        throw new Error("Translation id is missing");
      }

      const { data, fileName } = await exportService.exportTranslation(
        translationId,
        format
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
