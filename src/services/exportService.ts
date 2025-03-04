import { BlobResponse, FileType } from "@/types";
import { ApiService } from "./ApiService";

export class ExportService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL, { responseType: "blob" });
  }

  async exportTranslation(
    translationId: string,
    format: FileType
  ): Promise<BlobResponse> {
    return await this.getBlob(
      `/translations/${translationId}/export?format=${format}`
    );
  }
}

export const exportService = new ExportService();
