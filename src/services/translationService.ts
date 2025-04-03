import {
  LangCode,
  SelectTranslation,
  Translation,
  TranslationWithDocument,
  TranslationWithSegments,
  UpdatedId,
} from "@/types";
import { ApiService } from "./ApiService";
import { TranslationWithJoinedSegments, Update } from "@/types/Dtos";

export default class TranslationService extends ApiService {
  constructor() {
    super(import.meta.env.VITE_API_URL);
  }

  async getTranslations(params?: {
    limit?: number;
    order_by?: string;
    order?: "asc" | "desc";
  }): Promise<TranslationWithDocument[]> {
    const queryParams = new URLSearchParams();

    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.order_by) queryParams.append("order_by", params.order_by);
    if (params?.order) queryParams.append("order", params.order);

    const query = queryParams.toString();
    return this.get(`/translations${query ? `?${query}` : ""}`);
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

  async previewTranslation(translationId: string | number): Promise<string> {
    return this.get(`/translations/${translationId}/preview`);
  }

  async createTranslation(
    documentId: number,
    langCode: LangCode
  ): Promise<SelectTranslation> {
    return this.post(`/documents/${documentId}/translations`, {
      langCode,
    });
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
    return this.put(`/translations/${translationId}/segments`, {
      updates,
    });
  }
}

export const translationService = new TranslationService();
