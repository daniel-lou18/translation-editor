import { TranslationWithDocument } from "@/types/Translation";
import { ApiService } from "./ApiService";

export class UploadService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async submitSourceText(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return await this.post<TranslationWithDocument>(
      "/upload/documents/source",
      formData
    );
  }

  async submitTmTexts(files: File[]) {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    return await this.post("upload/tms", formData);
  }
}

export const uploadService = new UploadService();
