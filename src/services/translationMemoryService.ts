import { SemanticMatch } from "@/types";
import { ApiService } from "./ApiService";
import { TmSegmentMatch } from "@/types/Dtos";

export class TranslationMemoryService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL);
  }

  async getMatches(sourceSegmentId: number): Promise<SemanticMatch[]> {
    const response = await this.get<TmSegmentMatch[]>(
      `/tm/matches/${sourceSegmentId}`
    );

    const formattedMatches = this.transformSemanticMatches(response);

    if (formattedMatches.length === 0) {
      throw new Error("No tm matches found");
    }

    return formattedMatches;
  }

  private transformSemanticMatches(matches: TmSegmentMatch[]): SemanticMatch[] {
    const filteredMatches = matches.filter((match) => match.targetSegment);
    return filteredMatches.map(({ sourceSegment, targetSegment }) => {
      return {
        id: sourceSegment.id,
        sourceText: sourceSegment.textContent,
        targetText: targetSegment?.textContent || "",
        similarityScore: sourceSegment.similarityScore,
      };
    });
  }
}

export const translationMemoryService = new TranslationMemoryService();
