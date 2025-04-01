import { BlobResponse, MimeType } from "@/types/Files";
import { ApiService } from "./ApiService";

export type ExportFormat = {
  input: MimeType;
  output: MimeType;
};

export class ExportService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL, { responseType: "blob" });
  }

  async exportTranslation(
    translationId: string,
    format: ExportFormat
  ): Promise<BlobResponse> {
    return await this.getBlob(
      `/translations/${translationId}/export?inputMimeType=${format.input}&outputMimeType=${format.output}`
    );
  }
}

export const exportService = new ExportService();
