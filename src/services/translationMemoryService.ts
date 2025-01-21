import { SearchQuery, SemanticMatch } from "@/types";
import { ApiService } from "./ApiService";

export class TranslationMemoryService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL);
  }

  async getMatches(data: SearchQuery): Promise<SemanticMatch[]> {
    return await this.post("/search", data);
  }
}

export const translationMemoryService = new TranslationMemoryService();
