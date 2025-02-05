import { TranslationWithDocument } from "@/types/Translation";
import { ApiService } from "./ApiService";
import { UploadResult } from "@/types/Tm";
import { LangMetadata } from "@/types/Dtos";

export class UploadService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async submitSourceText(file: File, langMetadata: LangMetadata) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("targetLang", langMetadata.targetLang);
    if (langMetadata.sourceLang) {
      formData.append("sourceLang", langMetadata.sourceLang);
    }

    return await this.post<TranslationWithDocument>(
      "/upload/documents/source",
      formData
    );
  }

  async submitTmTexts(files: File[]): Promise<UploadResult> {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    return await this.post("upload/tms", formData);
  }
}

export const uploadService = new UploadService();
