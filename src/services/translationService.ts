import { TranslationWithSegments, UpdatedId } from "@/types";
import { ApiService } from "./ApiService";
import { TranslationWithJoinedSegments, Update } from "@/types/Dtos";

export default class TranslationService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL);
  }

  async getTranslation(
    translationId: string
  ): Promise<TranslationWithSegments> {
    const data: TranslationWithJoinedSegments = await this.get(
      `/translations/${translationId}`
    );

    if (!data) {
      throw new Error("No translation data received");
    }

    return this.transformSegments(data);
  }

  private transformSegments(data: TranslationWithJoinedSegments) {
    return {
      ...data,
      segments: data.segments.map(({ sourceSegment, targetSegment }) => ({
        id: targetSegment.id,
        translationId: targetSegment.translationId,
        sourceSegmentId: sourceSegment.id,
        sourceText: sourceSegment.sourceText,
        sourceLang: data.document.sourceLang,
        embedding: sourceSegment.embedding,
        targetText: targetSegment.targetText,
        targetLang: data.translation.targetLang,
        status: targetSegment.status,
      })),
    };
  }

  async updateSegments(
    translationId: string,
    updates: Update[]
  ): Promise<UpdatedId[]> {
    return await this.put(`/translations/${translationId}/segments`, {
      updates,
    });
  }
}

export const translationService = new TranslationService();
