import { Segment, SegmentWithTranslation, UpdatedId } from "@/types";
import { ApiService } from "./ApiService";

export default class SegmentsService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL);
  }

  async getSegments(
    projectId: string,
    translationId: string
  ): Promise<SegmentWithTranslation[]> {
    return await this.get(
      `/projects/${projectId}/translations/${translationId}/segments`
    );
  }

  async updateSegments(
    projectId: string,
    translationId: string,
    segments: Segment[]
  ): Promise<UpdatedId[]> {
    return await this.put(
      `/projects/${projectId}/translations/${translationId}/segments`,
      { segments }
    );
  }
}

export const segmentsService = new SegmentsService();
