import { ApiService } from "./ApiService";
import { UpdateDocDto } from "@/types/Dtos";

export class DocumentService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL);
  }

  async updateDoc(doc: UpdateDocDto) {
    return this.put(`/documents/${doc.id}`, doc);
  }

  async deleteDoc(docId: number) {
    return this.delete(`/documents/${docId}`);
  }
}

export const documentService = new DocumentService();
