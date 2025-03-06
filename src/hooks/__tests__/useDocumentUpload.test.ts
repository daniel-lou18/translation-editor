import { renderHook, act } from "@testing-library/react";
import { useDocumentUpload } from "../useDocumentUpload";
import { uploadService } from "@/services/uploadService";
import { useTranslationRoute } from "@/hooks/useTranslationRoute";
import { toast } from "sonner";
import { vi, describe, it, expect, beforeEach, Mock } from "vitest";
import { useUploadSingle } from "@/hooks/useUploadSingle";
import type { Lang, Domain } from "@/types";
import type { RenderHookResult } from "@testing-library/react";

// Mock dependencies
vi.mock("@tanstack/react-query", () => ({
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
    navigateToTranslation: vi.fn(),
    projectId: "project123",
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
    submitSourceText: vi.fn(),
    submitDocumentFile: vi.fn(),
  },
}));

describe("useDocumentUpload", () => {
  const mockTextFile = new File(["test"], "test.txt", { type: "text/plain" });
  const mockDocFile = new File(["test"], "test.docx", {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  const mockEvent = {
    preventDefault: vi.fn(),
  } as unknown as React.FormEvent<HTMLFormElement>;

  const defaultConfig = {
    newProject: true,
    sourceLang: "English (USA)" as Lang,
    targetLang: "French (France)" as Lang,
    domain: "legal" as Domain,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    let currentFile: File | null = null;

    (useUploadSingle as Mock).mockImplementation(() => ({
      file: currentFile,
      setFile: (file: File | null) => {
        currentFile = file;
      },
      removeFile: () => {
        currentFile = null;
      },
    }));
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useDocumentUpload(defaultConfig));

    expect(result.current.file).toBeNull();
    expect(result.current.isLoading).toBeFalsy();
  });

  it("should handle file selection and removal", () => {
    const { result } = renderHook(() => useDocumentUpload(defaultConfig));

    act(() => {
      result.current.setFile(mockDocFile);
    });

    expect(result.current.file).toBe(mockDocFile);

    act(() => {
      result.current.removeFile();
    });

    expect(result.current.file).toBeNull();
  });

  it("should show error when submitting without file", async () => {
    const { result } = renderHook(() => useDocumentUpload(defaultConfig));

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Could not upload document: Error: File is required",
      {
        classNames: {
          toast: "bg-red-200",
        },
      }
    );
  });

  it("should call submitSourceText for text files", async () => {
    const { result } = renderHook(() => useDocumentUpload(defaultConfig));

    act(() => {
      result.current.setFile(mockTextFile);
    });

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(uploadService.submitSourceText).toHaveBeenCalledWith(
      mockTextFile,
      expect.objectContaining({
        sourceLang: "English (USA)",
        targetLang: "French (France)",
        domain: "legal",
        projectId: "project123",
      }),
      true
    );
  });

  it("should call submitDocumentFile for non-text files", async () => {
    const { result } = renderHook(() => useDocumentUpload(defaultConfig));

    act(() => {
      result.current.setFile(mockDocFile);
    });

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(uploadService.submitDocumentFile).toHaveBeenCalledWith(
      mockDocFile,
      expect.objectContaining({
        sourceLang: "English (USA)",
        targetLang: "French (France)",
        domain: "legal",
        projectId: "project123",
      }),
      true
    );
  });

  it("should handle upload error", async () => {
    const { result } = renderHook(() => useDocumentUpload(defaultConfig));
    const error = new Error("Upload failed");
    (uploadService.submitDocumentFile as Mock).mockRejectedValueOnce(error);

    act(() => {
      result.current.setFile(mockDocFile);
    });

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(toast.error).toHaveBeenCalledWith(
      `Could not upload document: ${error}`,
      {
        classNames: {
          toast: "bg-red-200",
        },
      }
    );
  });

  it("should handle existing project upload", async () => {
    const { result } = renderHook(() =>
      useDocumentUpload({ ...defaultConfig, newProject: false })
    );

    act(() => {
      result.current.setFile(mockDocFile);
    });

    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(uploadService.submitDocumentFile).toHaveBeenCalledWith(
      mockDocFile,
      expect.objectContaining({
        sourceLang: "English (USA)",
        targetLang: "French (France)",
        domain: "legal",
        projectId: "project123",
      }),
      false
    );
  });
});
