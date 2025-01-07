import { TranslationMatch } from "@/types";
import { ApiService } from "./ApiService";

export class TranslationService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL);
  }

  async getTranslation(
    sourceSegment: string,
    examples: TranslationMatch
  ): Promise<string> {
    return await this.post("/translations/translate", {
      sourceSegment,
      examples,
    });
  }
}

export const translationService = new TranslationService();
