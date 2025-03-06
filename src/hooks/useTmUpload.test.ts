import { renderHook, act } from "@testing-library/react";
import { useTmUpload } from "./useTmUpload";
import { uploadService } from "@/services/uploadService";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import { toast } from "sonner";
import { vi, describe, it, expect, beforeEach, Mock } from "vitest";

// Mock dependencies
vi.mock("@tanstack/react-query", () => ({
  useQueryClient: vi.fn(() => ({
    invalidateQueries: vi.fn(),
  })),
  useMutation: vi
    .fn()
    .mockImplementation(({ mutationFn, onSuccess, onError }) => ({
      mutate: vi.fn().mockImplementation(async (variables) => {
        try {
          const result = await mutationFn(variables);
          await onSuccess?.(result);
        } catch (error) {
          await onError?.(error);
        }
      }),
      isLoading: false,
    })),
}));

vi.mock("@/hooks/useTranslationRoute", () => ({
  useTranslationRoute: vi.fn(() => ({
    navigateToTms: vi.fn(),
  })),
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock("@/services/uploadService", () => ({
  uploadService: {
    createTm: vi.fn(),
    addTmPairs: vi.fn(),
  },
}));

describe("useTmUpload", () => {
  const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
  const mockEvent = {
    preventDefault: vi.fn(),
  } as unknown as React.FormEvent<HTMLFormElement>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useTmUpload({ type: "create" }));

    expect(result.current.sourceFile).toBeNull();
    expect(result.current.targetFile).toBeNull();
    expect(result.current.sourceLang).toBe("English (USA)");
    expect(result.current.targetLang).toBe("French (France)");
    expect(result.current.domain).toBe("legal");
    expect(result.current.isLoading).toBeFalsy();
  });

  it("should handle file selection and removal", () => {
    const { result } = renderHook(() => useTmUpload({ type: "create" }));

    act(() => {
      result.current.setSourceFile(mockFile);
      result.current.setTargetFile(mockFile);
    });

    expect(result.current.sourceFile).toBe(mockFile);
    expect(result.current.targetFile).toBe(mockFile);

    act(() => {
      result.current.removeSourceFile();
      result.current.removeTargetFile();
    });

    expect(result.current.sourceFile).toBeNull();
    expect(result.current.targetFile).toBeNull();
  });

  it("should show error toast when submitting without files", async () => {
    const { result } = renderHook(() => useTmUpload({ type: "create" }));

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Please select both source and target files"
    );
    expect(uploadService.createTm).not.toHaveBeenCalled();
  });

  it("should call createTm when submitting with type create", async () => {
    const { result } = renderHook(() => useTmUpload({ type: "create" }));
    const mockResponse = { tmId: "123" };
    (uploadService.createTm as unknown as Mock).mockResolvedValueOnce(
      mockResponse
    );

    act(() => {
      result.current.setSourceFile(mockFile);
      result.current.setTargetFile(mockFile);
    });

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(uploadService.createTm).toHaveBeenCalledWith(
      [mockFile, mockFile],
      expect.objectContaining({
        sourceLang: "English (USA)",
        targetLang: "French (France)",
        domain: "legal",
      })
    );
    expect(toast.success).toHaveBeenCalledWith(
      "Successfully created translation memory"
    );
  });

  it("should call addTmPairs when submitting with type add", async () => {
    const { result } = renderHook(() =>
      useTmUpload({ type: "add", tmId: "123" })
    );
    const mockResponse = { tmId: "123" };
    (uploadService.addTmPairs as unknown as Mock).mockResolvedValueOnce(
      mockResponse
    );

    act(() => {
      result.current.setSourceFile(mockFile);
      result.current.setTargetFile(mockFile);
    });

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(uploadService.addTmPairs).toHaveBeenCalledWith(
      [mockFile, mockFile],
      expect.objectContaining({
        sourceLang: "English (USA)",
        targetLang: "French (France)",
        domain: "legal",
        tmId: "123",
      })
    );
    expect(toast.success).toHaveBeenCalledWith(
      "Successfully added segments to translation memory"
    );
  });

  it("should handle upload error", async () => {
    const { result } = renderHook(() => useTmUpload({ type: "create" }));
    const error = new Error("Upload failed");
    (uploadService.createTm as unknown as Mock).mockRejectedValueOnce(error);

    act(() => {
      result.current.setSourceFile(mockFile);
      result.current.setTargetFile(mockFile);
    });

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(toast.error).toHaveBeenCalledWith(
      `Could not upload translation memory: ${error}`,
      expect.any(Object)
    );
  });

  it("should update language and domain values", () => {
    const { result } = renderHook(() => useTmUpload({ type: "create" }));

    act(() => {
      result.current.onSourceLangChange("Spanish (Spain)");
      result.current.onTargetLangChange("German (Germany)");
      result.current.onDomainChange("medical");
    });

    expect(result.current.sourceLang).toBe("Spanish (Spain)");
    expect(result.current.targetLang).toBe("German (Germany)");
    expect(result.current.domain).toBe("medical");
  });

  it("should invalidate queries and navigate on successful upload", async () => {
    const mockQueryClient = {
      invalidateQueries: vi.fn(),
    };
    const mockNavigateToTms = vi.fn();

    (useQueryClient as Mock).mockReturnValue(mockQueryClient);
    (useTranslationRoute as Mock).mockReturnValue({
      navigateToTms: mockNavigateToTms,
    });

    const { result } = renderHook(() => useTmUpload({ type: "create" }));
    const mockResponse = { tmId: "123" };
    (uploadService.createTm as unknown as Mock).mockResolvedValueOnce(
      mockResponse
    );

    act(() => {
      result.current.setSourceFile(mockFile);
      result.current.setTargetFile(mockFile);
    });

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ["tms"],
    });
    expect(mockNavigateToTms).toHaveBeenCalled();
  });
});
