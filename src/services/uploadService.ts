import { TranslationWithDocument } from "@/types/Translation";
import { ApiService } from "./ApiService";
import { UploadResult } from "@/types/Tm";
import { FileMetadata, DocumentPairId, AddTmPairsDTO } from "@/types/Dtos";
import { FullLangsDomain } from "@/types";

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
    fileMetadata: FileMetadata
  ): Promise<TranslationWithDocument> {
    const formData = this.createFormData(file, fileMetadata);

    return this.post<TranslationWithDocument>(
      `/upload/documents/source`,
      formData,
      { timeout: 120000 }
    );
  }

  async submitDocumentFile(
    file: File,
    fileMetadata: FileMetadata
  ): Promise<TranslationWithDocument> {
    const formData = this.createFormData(file, fileMetadata);

    return this.post<TranslationWithDocument>(
      `/upload/documents/file`,
      formData,
      { timeout: 120000 }
    );
  }

  async submitTmTexts(files: File[]): Promise<UploadResult> {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    return this.post("upload/tms", formData, {
      timeout: 120000,
    });
  }

  async createTm(
    files: File[],
    filesMetadata: FullLangsDomain
  ): Promise<DocumentPairId> {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("sourceLang", filesMetadata.sourceLang);
    formData.append("targetLang", filesMetadata.targetLang);
    formData.append("domain", filesMetadata.domain);

    return this.post("upload/documents/docpair", formData, {
      timeout: 120000,
    });
  }

  async addTmPairs(
    files: File[],
    filesMetadata: AddTmPairsDTO
  ): Promise<DocumentPairId> {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("sourceLang", filesMetadata.sourceLang);
    formData.append("targetLang", filesMetadata.targetLang);
    formData.append("domain", filesMetadata.domain);
    formData.append("tmId", filesMetadata.tmId);

    return this.post("upload/tms/segments", formData, {
      timeout: 120000,
    });
  }

  private createFormData(file: File, fileMetadata: FileMetadata) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("targetLang", fileMetadata.targetLang);
    formData.append("domain", fileMetadata.domain);

    if (fileMetadata.sourceLang) {
      formData.append("sourceLang", fileMetadata.sourceLang);
    }

    if (fileMetadata.tmId) {
      formData.append("tmId", fileMetadata.tmId);
    }

    if ("projectId" in fileMetadata && fileMetadata.projectId) {
      formData.append("projectId", fileMetadata.projectId);
    }

    return formData;
  }
}

export const uploadService = new UploadService();
