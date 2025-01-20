import { LangCode, SemanticMatch } from "@/types";
import { ApiService } from "./ApiService";

export class TranslateService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL);
  }

  async getTranslation(
    sourceSegment: string,
    examples: SemanticMatch[],
    sourceLang: LangCode,
    targetLang: LangCode
  ): Promise<string> {
    return await this.post("/translate", {
      sourceSegment,
      examples,
      sourceLang,
      targetLang,
    });
  }
}

export const translateService = new TranslateService();
