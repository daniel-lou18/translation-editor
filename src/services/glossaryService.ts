import { GlossaryTerm } from "@/types/GlossaryTerm";
import { ApiService } from "./ApiService";

export class GlossaryService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL);
  }

  async search(searchQuery: string): Promise<GlossaryTerm[]> {
    return this.get(`/glossaries/search?q=${searchQuery}`);
  }
}

export const glossaryService = new GlossaryService();
