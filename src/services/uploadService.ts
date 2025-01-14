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

    return await this.post<string>("/upload/documents/source", formData);
  }
}

export const uploadService = new UploadService();
