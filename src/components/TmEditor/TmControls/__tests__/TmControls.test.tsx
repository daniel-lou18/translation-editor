import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TmControls from "../index";
import { useTmRoute } from "@/hooks/useTmRoute";
import { useTms } from "@/hooks/useTms";
import { Tm } from "@/types/Tm";

// Mock the hooks
vi.mock("@/hooks/useTmRoute", () => ({
  useTmRoute: vi.fn(),
}));

vi.mock("@/hooks/useTms", () => ({
  useTms: vi.fn(),
}));

// Mock the child components
vi.mock("../SelectTm", () => {
  return {
    default: ({ tms, currentTm, onSelect }: any) => (
      <div data-testid="select-tm">
        <span data-testid="tms-count">{Object.keys(tms).length}</span>
        <span data-testid="current-tm-id">
          {currentTm ? currentTm.id : "none"}
        </span>
        <button data-testid="select-button" onClick={() => onSelect("2")}>
          Select TM
        </button>
      </div>
    ),
  };
});

vi.mock("../TmControlsSkeleton", () => ({
  TmControlsSkeleton: () => (
    <div data-testid="tm-controls-skeleton">Loading...</div>
  ),
}));

vi.mock("@/components/ui/Container", () => {
  return {
    default: ({ children, className }: any) => (
      <div data-testid="container" className={className}>
        {children}
      </div>
    ),
  };
});

vi.mock("@/components/ui/DataHandler", () => {
  return {
    default: ({
      children,
      isLoading,
      isError,
      error,
      loadingComponent,
    }: any) => (
      <div data-testid="data-handler">
        {isLoading ? (
          loadingComponent
        ) : isError ? (
          <div>Error: {error?.message}</div>
        ) : (
          children
        )}
      </div>
    ),
  };
});

vi.mock("lucide-react", () => ({
  BrainCircuit: ({ size, className }: any) => (
    <div
      data-testid="brain-circuit"
      className={className}
      style={{ width: size, height: size }}
    >
      Icon
    </div>
  ),
}));

describe("TmControls", () => {
  const mockNavigateToTm = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state when data is loading", () => {
    // Mock the hooks to return loading state
    (useTmRoute as any).mockReturnValue({
      tmId: "",
      navigateToTm: mockNavigateToTm,
    });

    (useTms as any).mockReturnValue({
      normalizedTms: {},
      isLoading: true,
      isError: false,
      error: null,
    });

    render(<TmControls />);

    expect(screen.getByTestId("tm-controls-skeleton")).toBeInTheDocument();
    expect(screen.queryByTestId("select-tm")).not.toBeInTheDocument();
  });

  it("should render error state when there is an error", () => {
    // Mock the hooks to return error state
    (useTmRoute as any).mockReturnValue({
      tmId: "",
      navigateToTm: mockNavigateToTm,
    });

    (useTms as any).mockReturnValue({
      normalizedTms: {},
      isLoading: false,
      isError: true,
      error: new Error("Failed to load TMs"),
    });

    render(<TmControls />);

    expect(screen.getByText("Error: Failed to load TMs")).toBeInTheDocument();
    expect(screen.queryByTestId("select-tm")).not.toBeInTheDocument();
  });

  it("should render SelectTm with correct props when data is loaded", () => {
    const mockTm1: Tm = {
      id: 1,
      name: "TM 1",
      description: "Description 1",
      sourceLang: "en",
      targetLang: "fr",
      domain: "general",
      subdomain: null,
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
    };

    const mockTm2: Tm = {
      id: 2,
      name: "TM 2",
      description: "Description 2",
      sourceLang: "en",
      targetLang: "es",
      domain: "technical",
      subdomain: null,
      createdAt: "2023-01-02",
      updatedAt: "2023-01-02",
    };

    const mockTm3: Tm = {
      id: 3,
      name: "TM 3",
      description: "Description 3",
      sourceLang: "en",
      targetLang: "de",
      domain: "legal",
      subdomain: null,
      createdAt: "2023-01-03",
      updatedAt: "2023-01-03",
    };

    const normalizedTms = {
      1: mockTm1,
      2: mockTm2,
      3: mockTm3,
    };

    // Mock the hooks to return successful state
    (useTmRoute as any).mockReturnValue({
      tmId: "1",
      navigateToTm: mockNavigateToTm,
    });

    (useTms as any).mockReturnValue({
      normalizedTms,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<TmControls />);

    expect(screen.getByTestId("select-tm")).toBeInTheDocument();
    expect(screen.getByTestId("tms-count").textContent).toBe("3");
    expect(screen.getByTestId("current-tm-id").textContent).toBe("1");
  });

  it("should call navigateToTm when a TM is selected", () => {
    const mockTm1: Tm = {
      id: 1,
      name: "TM 1",
      description: "Description 1",
      sourceLang: "en",
      targetLang: "fr",
      domain: "general",
      subdomain: null,
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
    };

    const mockTm2: Tm = {
      id: 2,
      name: "TM 2",
      description: "Description 2",
      sourceLang: "en",
      targetLang: "es",
      domain: "technical",
      subdomain: null,
      createdAt: "2023-01-02",
      updatedAt: "2023-01-02",
    };

    const normalizedTms = {
      1: mockTm1,
      2: mockTm2,
    };

    // Mock the hooks
    (useTmRoute as any).mockReturnValue({
      tmId: "1",
      navigateToTm: mockNavigateToTm,
    });

    (useTms as any).mockReturnValue({
      normalizedTms,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<TmControls />);

    // Click the select button in the mocked SelectTm component
    fireEvent.click(screen.getByTestId("select-button"));

    // Verify that navigateToTm was called with the correct ID
    expect(mockNavigateToTm).toHaveBeenCalledWith("2");
  });

  it("should handle empty normalizedTms", () => {
    // Mock the hooks to return empty normalizedTms
    (useTmRoute as any).mockReturnValue({
      tmId: "",
      navigateToTm: mockNavigateToTm,
    });

    (useTms as any).mockReturnValue({
      normalizedTms: {},
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<TmControls />);

    expect(screen.getByTestId("select-tm")).toBeInTheDocument();
    expect(screen.getByTestId("tms-count").textContent).toBe("0");
    expect(screen.getByTestId("current-tm-id").textContent).toBe("none");
  });
});
