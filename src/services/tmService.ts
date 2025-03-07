import { SemanticMatch } from "@/types";
import { ApiService } from "./ApiService";
import { TmSegmentMatch, UpdateTmDto } from "@/types/Dtos";
import { Tm } from "@/types/Tm";

export class TmService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL);
  }

  async getTms(): Promise<Tm[]> {
    return this.get(`/tms`);
  }

  async deleteTm(tmId: number): Promise<void> {
    return this.delete(`/tms/${tmId}`);
  }

  async updateTm(tm: UpdateTmDto): Promise<Tm> {
    return this.put(`/tms/${tm.id}`, { tm });
  }

  async getMatches(sourceSegmentId: number): Promise<SemanticMatch[]> {
    const response = await this.get<TmSegmentMatch[]>(
      `/tms/matches/${sourceSegmentId}`
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

export const tmService = new TmService();
