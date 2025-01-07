import { Segment } from "@/types";
import { ApiService } from "./ApiService";

export default class SegmentsService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL);
  }

  async getSegments(
    projectId: string,
    translationId: string
  ): Promise<Segment[]> {
    return await this.get(
      `/projects/${projectId}/translations/${translationId}/segments`
    );
  }
}

export const segmentsService = new SegmentsService();
