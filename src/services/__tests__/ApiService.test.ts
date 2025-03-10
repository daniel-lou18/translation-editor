import { describe, it, expect, vi, beforeEach } from "vitest";
import { ApiService } from "../ApiService";
import axios, { AxiosInstance } from "axios";

vi.mock("axios");

describe("ApiService", () => {
  let apiService: ApiService;
  let mockAxiosInstance: { get: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    vi.clearAllMocks();
    mockAxiosInstance = {
      get: vi.fn(),
    };
    (axios.create as any).mockReturnValue(mockAxiosInstance);
    apiService = new ApiService("http://test-api.com");
  });

  describe("getBlob", () => {
    it("should make a GET request with blob response type", async () => {
      const url = "/test-url";
      const mockBlob = new Blob(["test content"], { type: "text/plain" });
      const mockResponse = {
        data: mockBlob,
        headers: {
          "content-type": 'text/plain; filename="test.txt"',
        },
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await apiService.getBlob(url);

      expect(result.data).toEqual(mockBlob);
      expect(result.fileName).toBe("test.txt");
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(url, {
        responseType: "blob",
        headers: { Accept: "text/plain" },
      });
    });

    it("should use default filename when content-type header doesn't contain filename", async () => {
      const url = "/test-url";
      const mockBlob = new Blob(["test content"], { type: "text/plain" });
      const mockResponse = {
        data: mockBlob,
        headers: {
          "content-type": "text/plain",
        },
      };

      vi.useFakeTimers();
      vi.setSystemTime(new Date("2024-01-01"));

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await apiService.getBlob(url);

      expect(result.data).toEqual(mockBlob);
      expect(result.fileName).toBe(`file-${Date.now()}`);

      vi.useRealTimers();
    });

    it("should use provided Accept header in config", async () => {
      const url = "/test-url";
      const config = { headers: { Accept: "application/pdf" } };
      const mockBlob = new Blob(["test content"], { type: "application/pdf" });
      const mockResponse = {
        data: mockBlob,
        headers: {
          "content-type": "application/pdf",
        },
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      await apiService.getBlob(url, config);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(url, {
        ...config,
        responseType: "blob",
        headers: { Accept: "application/pdf" },
      });
    });

    it("should handle network errors", async () => {
      const url = "/test-url";
      const axiosError = {
        isAxiosError: true,
        response: {
          data: {
            message: "Network error occurred",
          },
        },
        message: "Network error occurred",
      };

      mockAxiosInstance.get.mockRejectedValue(axiosError);

      await expect(apiService.getBlob(url)).rejects.toThrow(
        "Network error occurred"
      );
    });

    it("should handle unexpected errors", async () => {
      const url = "/test-url";
      const error = new Error("Unexpected error");

      mockAxiosInstance.get.mockRejectedValue(error);

      await expect(apiService.getBlob(url)).rejects.toThrow(
        "An unexpected error occurred"
      );
    });
  });
});
