import { ApiService } from "./ApiService";
import { UpdateDocDto } from "@/types/Dtos";
import { Document, DocumentWithTranslationsSegments } from "@/types/Document";

export class DocumentService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL);
  }

  async getDocument(
    documentId: string | number
  ): Promise<DocumentWithTranslationsSegments> {
    return this.get(`/documents/${documentId}`);
  }

  async updateDoc(doc: UpdateDocDto): Promise<Document> {
    return this.put(`/documents/${doc.id}`, { doc });
  }

  async deleteDoc(docId: number) {
    return this.delete(`/documents/${docId}`);
  }
}

export const documentService = new DocumentService();
