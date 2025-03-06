import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import CreateTm from "../CreateTm";
import { useTmUpload } from "@/hooks/useTmUpload";
import { useTmFileFormat } from "@/hooks/useTmFileFormat";
import { useLangsDomain } from "@/hooks/useLangsDomain";
import { useTmExcelUpload } from "@/hooks/useTmExcelUpload";

// Mock child components
vi.mock("../UploadTmForm", () => {
  const UploadTmForm = ({
    children,
    handleSubmit,
    isLoading,
    buttonText,
  }: any) => (
    <form role="form" onSubmit={handleSubmit}>
      {children}
      <button disabled={isLoading}>{buttonText}</button>
    </form>
  );

  UploadTmForm.Header = ({ children, title }: any) => (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );

  UploadTmForm.UploadSingle = ({
    file,
    sourceLang,
    targetLang,
    langItems,
  }: any) => (
    <div>
      <div>Excel File</div>
      <div>Source Language: {sourceLang.lang}</div>
      <div>Target Language: {targetLang.lang}</div>
    </div>
  );

  UploadTmForm.UploadDouble = ({ source, target }: any) => (
    <div>
      <div>Source File</div>
      <div>Target File</div>
      <div>Source Language: {source.lang}</div>
      <div>Target Language: {target.lang}</div>
    </div>
  );

  return { default: UploadTmForm };
});

vi.mock("../UploadTmTitle", () => ({
  default: ({ children, title, tmFormat, toggleTmFormat, tmFormats }: any) => (
    <div>
      <h1>{title}</h1>
      <select
        data-testid="format-selector"
        value={tmFormat}
        onChange={(e) => toggleTmFormat(e.target.value)}
      >
        {tmFormats.map((format: any) => (
          <option key={format.value} value={format.value}>
            {format.label}
          </option>
        ))}
      </select>
      {children}
    </div>
  ),
}));

vi.mock("@/components/ui/Container", () => ({
  default: ({ children }: any) => <div>{children}</div>,
}));

vi.mock("@/components/ui/Combobox", () => ({
  default: ({ name, value, onChange }: any) => (
    <input
      role="combobox"
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={name}
    />
  ),
}));

// Mock the hooks
vi.mock("@/hooks/useTmUpload", () => ({
  useTmUpload: vi.fn(),
}));

vi.mock("@/hooks/useTmExcelUpload", () => ({
  useTmExcelUpload: vi.fn(),
}));

vi.mock("@/hooks/useTmFileFormat", () => ({
  useTmFileFormat: vi.fn(),
}));

vi.mock("@/hooks/useLangsDomain", () => ({
  useLangsDomain: vi.fn(),
}));

describe("CreateTm", () => {
  const mockHandleSubmit = vi.fn();
  const mockHandleSubmitExcel = vi.fn();
  const mockSetSourceFile = vi.fn();
  const mockSetTargetFile = vi.fn();
  const mockRemoveSourceFile = vi.fn();
  const mockRemoveTargetFile = vi.fn();
  const mockSetDomain = vi.fn();
  const mockSetSourceLang = vi.fn();
  const mockSetTargetLang = vi.fn();
  const mockToggleTmFormat = vi.fn();
  const mockSetFile = vi.fn();
  const mockRemoveFile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useLangsDomain as any).mockReturnValue({
      sourceLang: "English (USA)",
      targetLang: "French (France)",
      domain: "legal",
      setSourceLang: mockSetSourceLang,
      setTargetLang: mockSetTargetLang,
      setDomain: mockSetDomain,
      domainItems: [{ value: "legal", label: "Legal" }],
      langItems: [
        { value: "English (USA)", label: "English (USA)" },
        { value: "French (France)", label: "French (France)" },
      ],
    });

    (useTmUpload as any).mockReturnValue({
      sourceFile: null,
      targetFile: null,
      setSourceFile: mockSetSourceFile,
      setTargetFile: mockSetTargetFile,
      removeSourceFile: mockRemoveSourceFile,
      removeTargetFile: mockRemoveTargetFile,
      isLoading: false,
      handleSubmit: mockHandleSubmit,
    });

    (useTmExcelUpload as any).mockReturnValue({
      file: null,
      setFile: mockSetFile,
      removeFile: mockRemoveFile,
      isLoading: false,
      handleSubmit: mockHandleSubmitExcel,
    });

    (useTmFileFormat as any).mockReturnValue({
      tmFormat: "parallel",
      toggleTmFormat: mockToggleTmFormat,
      tmFormats: [
        { value: "parallel", label: "Parallel Files" },
        { value: "sheet", label: "Excel Sheet" },
      ],
    });
  });

  it("renders the create TM form with correct title", () => {
    render(<CreateTm />);
    expect(screen.getByText("Create Translation Memory")).toBeInTheDocument();
  });

  it("renders domain selection combobox", () => {
    render(<CreateTm />);
    expect(screen.getByText("Domain:")).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "domain" })
    ).toBeInTheDocument();
  });

  it("shows parallel files upload by default", () => {
    render(<CreateTm />);
    expect(screen.getByText("Source File")).toBeInTheDocument();
    expect(screen.getByText("Target File")).toBeInTheDocument();
  });

  it("switches to excel sheet upload when format is changed", () => {
    (useTmFileFormat as any).mockReturnValue({
      tmFormat: "sheet",
      toggleTmFormat: mockToggleTmFormat,
      tmFormats: [
        { value: "parallel", label: "Parallel Files" },
        { value: "sheet", label: "Excel Sheet" },
      ],
    });

    render(<CreateTm />);
    expect(screen.getByText("Excel File")).toBeInTheDocument();
  });

  it("handles parallel files form submission", () => {
    render(<CreateTm />);
    const form = screen.getByRole("form");
    fireEvent.submit(form);
    expect(mockHandleSubmit).toHaveBeenCalled();
    expect(mockHandleSubmitExcel).not.toHaveBeenCalled();
  });

  it("handles excel file form submission", () => {
    (useTmFileFormat as any).mockReturnValue({
      tmFormat: "sheet",
      toggleTmFormat: mockToggleTmFormat,
      tmFormats: [
        { value: "parallel", label: "Parallel Files" },
        { value: "sheet", label: "Excel Sheet" },
      ],
    });

    render(<CreateTm />);
    const form = screen.getByRole("form");
    fireEvent.submit(form);
    expect(mockHandleSubmitExcel).toHaveBeenCalled();
    expect(mockHandleSubmit).not.toHaveBeenCalled();
  });

  it("shows loading state when submitting parallel files", () => {
    (useTmUpload as any).mockReturnValue({
      sourceFile: null,
      targetFile: null,
      setSourceFile: mockSetSourceFile,
      setTargetFile: mockSetTargetFile,
      removeSourceFile: mockRemoveSourceFile,
      removeTargetFile: mockRemoveTargetFile,
      isLoading: true,
      handleSubmit: mockHandleSubmit,
    });

    render(<CreateTm />);
    const submitButton = screen.getByRole("button", { name: "Create TM" });
    expect(submitButton).toBeDisabled();
  });

  it("shows loading state when submitting excel file", () => {
    (useTmFileFormat as any).mockReturnValue({
      tmFormat: "sheet",
      toggleTmFormat: mockToggleTmFormat,
      tmFormats: [
        { value: "parallel", label: "Parallel Files" },
        { value: "sheet", label: "Excel Sheet" },
      ],
    });

    (useTmExcelUpload as any).mockReturnValue({
      file: null,
      setFile: mockSetFile,
      removeFile: mockRemoveFile,
      isLoading: true,
      handleSubmit: mockHandleSubmitExcel,
    });

    render(<CreateTm />);
    const submitButton = screen.getByRole("button", { name: "Create TM" });
    expect(submitButton).toBeDisabled();
  });

  it("allows domain selection", () => {
    render(<CreateTm />);
    const domainCombobox = screen.getByRole("combobox", { name: "domain" });
    fireEvent.change(domainCombobox, { target: { value: "medical" } });
    expect(mockSetDomain).toHaveBeenCalledWith("medical");
  });

  it("allows switching between parallel and excel formats", () => {
    render(<CreateTm />);
    const formatSelector = screen.getByTestId("format-selector");
    fireEvent.change(formatSelector, { target: { value: "sheet" } });
    expect(mockToggleTmFormat).toHaveBeenCalledWith("sheet");
  });
});
