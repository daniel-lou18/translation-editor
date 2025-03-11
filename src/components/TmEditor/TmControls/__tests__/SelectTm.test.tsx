import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectTm from "../SelectTm";
import { Tm } from "@/types/Tm";

// Mock the Combobox component
vi.mock("@/components/ui/Combobox", () => {
  return {
    default: ({ name, items, value, onChange, buttonVariant }: any) => (
      <div
        data-testid="combobox"
        data-name={name}
        data-value={value}
        data-variant={buttonVariant}
      >
        <span data-testid="items-count">{items.length}</span>
        {items.map((item: any) => (
          <div key={item.value} data-testid={`item-${item.value}`}>
            {item.label}
          </div>
        ))}
        <button data-testid="select-button" onClick={() => onChange("2")}>
          Select
        </button>
      </div>
    ),
  };
});

describe("SelectTm", () => {
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

  const mockOnSelect = vi.fn();

  it("should render Combobox with correct props", () => {
    render(
      <SelectTm
        tms={normalizedTms}
        currentTm={mockTm1}
        onSelect={mockOnSelect}
      />
    );

    const combobox = screen.getByTestId("combobox");
    expect(combobox).toBeInTheDocument();
    expect(combobox.getAttribute("data-name")).toBe("tm");
    expect(combobox.getAttribute("data-value")).toBe("1");
    expect(combobox.getAttribute("data-variant")).toBe("ghost");
  });

  it("should render all TM options", () => {
    render(
      <SelectTm
        tms={normalizedTms}
        currentTm={mockTm1}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByTestId("items-count").textContent).toBe("3");
    expect(screen.getByTestId("item-1")).toBeInTheDocument();
    expect(screen.getByTestId("item-2")).toBeInTheDocument();
    expect(screen.getByTestId("item-3")).toBeInTheDocument();
  });

  it("should call onSelect with the correct TM ID when an option is selected", () => {
    render(
      <SelectTm
        tms={normalizedTms}
        currentTm={mockTm1}
        onSelect={mockOnSelect}
      />
    );

    fireEvent.click(screen.getByTestId("select-button"));

    expect(mockOnSelect).toHaveBeenCalledWith("2");
  });

  it("should handle null currentTm", () => {
    render(
      <SelectTm tms={normalizedTms} currentTm={null} onSelect={mockOnSelect} />
    );

    const combobox = screen.getByTestId("combobox");
    expect(combobox.getAttribute("data-value")).toBe("");
  });

  it("should handle empty tms object", () => {
    render(<SelectTm tms={{}} currentTm={null} onSelect={mockOnSelect} />);

    expect(screen.getByTestId("items-count").textContent).toBe("0");
  });
});
