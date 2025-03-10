import { describe, it, expect, vi, beforeEach } from "vitest";
import { ExportService } from "../exportService";
import { ApiService } from "../ApiService";
import { outputContentTypes } from "@/types/Files";
// Create a mock class that extends ApiService
class MockApiService extends ApiService {
  constructor() {
    super("http://test-api.com");
  }
}

vi.mock("../ApiService", () => {
  return {
    ApiService: vi.fn().mockImplementation(() => ({
      getBlob: vi.fn(),
    })),
  };
});

describe("ExportService", () => {
  let exportService: ExportService;
  let mockGetBlob: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetBlob = vi.fn();

    // Mock the ApiService constructor and its getBlob method
    (ApiService as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      () => ({
        getBlob: mockGetBlob,
      })
    );

    // Create a new instance of ExportService for each test
    exportService = new ExportService();
  });

  describe("exportTranslation", () => {
    it("should call getBlob with correct parameters for PDF format", async () => {
      const translationId = "123";
      const format = "pdf";
      const mockResponse = { data: new Blob(), fileName: "test.pdf" };

      mockGetBlob.mockResolvedValue(mockResponse);

      const result = await exportService.exportTranslation(
        translationId,
        format
      );

      expect(mockGetBlob).toHaveBeenCalledWith(
        `/translations/${translationId}/export?format=${format}`,
        { headers: { Accept: outputContentTypes[format] } }
      );
      expect(result).toBe(mockResponse);
    });

    it("should call getBlob with correct parameters for TXT format", async () => {
      const translationId = "123";
      const format = "txt";
      const mockResponse = { data: new Blob(), fileName: "test.txt" };

      mockGetBlob.mockResolvedValue(mockResponse);

      const result = await exportService.exportTranslation(
        translationId,
        format
      );

      expect(mockGetBlob).toHaveBeenCalledWith(
        `/translations/${translationId}/export?format=${format}`,
        { headers: { Accept: outputContentTypes[format] } }
      );
      expect(result).toBe(mockResponse);
    });

    it("should handle errors from getBlob", async () => {
      const translationId = "123";
      const format = "pdf";
      const error = new Error("Network error");

      mockGetBlob.mockRejectedValue(error);

      await expect(
        exportService.exportTranslation(translationId, format)
      ).rejects.toThrow("Network error");
    });
  });
});
