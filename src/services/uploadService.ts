import { TranslationWithDocument } from "@/types/Translation";
import { ApiService } from "./ApiService";
import { UploadResult } from "@/types/Tm";
import { FileMetadata } from "@/types/Dtos";

export class UploadService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async submitSourceText(
    file: File,
    fileMetadata: FileMetadata,
    newProject = true
  ) {
    const formData = this.createFormData(file, fileMetadata, newProject);

    return this.post<TranslationWithDocument>(
      `/upload/documents/source?new-project=${newProject}`,
      formData
    );
  }

  async submitFile(file: File, fileMetadata: FileMetadata, newProject = true) {
    const formData = this.createFormData(file, fileMetadata, newProject);

    return this.post(`/upload/documents/file`, formData);
  }

  async submitTmTexts(files: File[]): Promise<UploadResult> {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    return this.post("upload/tms", formData);
  }

  private createFormData(
    file: File,
    fileMetadata: FileMetadata,
    newProject: boolean
  ) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("targetLang", fileMetadata.targetLang);

    if (fileMetadata.sourceLang) {
      formData.append("sourceLang", fileMetadata.sourceLang);
    }

    if (!newProject && "projectId" in fileMetadata && fileMetadata.projectId) {
      formData.append("projectId", fileMetadata.projectId);
    }

    return formData;
  }
}

export const uploadService = new UploadService();
