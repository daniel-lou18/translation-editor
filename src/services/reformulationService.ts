import { ApiService } from "./ApiService";

export class ReformulationService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL);
  }

  async getReformulation(
    translatedText: string,
    examples: string[]
  ): Promise<string> {
    return await this.post("/translations/reformulate", {
      translatedText,
      examples,
    });
  }
}

export const reformulationService = new ReformulationService();
