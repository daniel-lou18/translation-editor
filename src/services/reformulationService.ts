import { LangCodesDomain } from "@/types";
import { ApiService } from "./ApiService";
import { TextSegment } from "@/types/Dtos";

export class ReformulationService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL);
  }

  async getReformulation(
    translatedText: string,
    examples: string[],
    targetLang?: string
  ): Promise<string> {
    return await this.post(
      "/reformulate",
      {
        translatedText,
        examples,
        targetLang,
      },
      { timeout: 30000 }
    );
  }

  async getImprovedTranslation(
    segment: TextSegment,
    metadata: LangCodesDomain
  ): Promise<string> {
    return await this.post(
      "/improve",
      {
        segment,
        metadata,
      },
      { timeout: 30000 }
    );
  }
}

export const reformulationService = new ReformulationService();
