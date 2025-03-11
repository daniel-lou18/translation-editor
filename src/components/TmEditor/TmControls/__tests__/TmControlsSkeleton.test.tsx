import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TmControlsSkeleton } from "../TmControlsSkeleton";

// Mock the Skeleton component
vi.mock("@/components/ui/skeleton", () => ({
  Skeleton: ({ className }: any) => (
    <div data-testid="skeleton" className={className}></div>
  ),
}));

describe("TmControlsSkeleton", () => {
  it("should render skeleton elements", () => {
    render(<TmControlsSkeleton />);

    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons.length).toBe(2);
  });

  it("should render skeletons with correct classes", () => {
    render(<TmControlsSkeleton />);

    const skeletons = screen.getAllByTestId("skeleton");

    // First skeleton should be for the label
    expect(skeletons[0].className).toContain("h-4");
    expect(skeletons[0].className).toContain("w-[120px]");

    // Second skeleton should be for the combobox
    expect(skeletons[1].className).toContain("h-10");
    expect(skeletons[1].className).toContain("w-[200px]");
  });

  it("should render skeletons in a flex container", () => {
    const { container } = render(<TmControlsSkeleton />);

    const flexContainer = container.firstChild;
    expect(flexContainer).toHaveClass("flex");
    expect(flexContainer).toHaveClass("items-center");
    expect(flexContainer).toHaveClass("gap-2");
  });
});
