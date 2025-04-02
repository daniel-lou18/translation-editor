import { Download, GalleryHorizontal, Printer, X } from "lucide-react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "../button";
import Container from "../Container";
import { ToggleGroup, ToggleGroupItem } from "../toggle-group";
import { Mode } from "./HtmlViewer";
import DropdownButton from "../Editor/DropdownButton";
import { useExportTranslation } from "@/hooks/useExportTranslation";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { useNavigate } from "react-router";
import { shortenString } from "@/utils/helpers";

type ScaleControls = {
  scaleControls: {
    scale: number;
    updateScale: (scale: number) => void;
    calculateScale: () => void;
  };
};

type ViewMode = {
  viewMode: {
    mode: Mode;
    onChange: (mode: Mode) => void;
  };
  fileName?: never;
};

type FileName = {
  fileName: string;
  viewMode?: never;
};

type ViewerControlsProps = ScaleControls & (ViewMode | FileName);

export default function ViewerControls({
  scaleControls: { scale, updateScale, calculateScale },
  viewMode,
  fileName,
}: ViewerControlsProps) {
  const { handleDownload } = useExportTranslation();
  const { currentTranslation } = useCurrentProject();
  const navigate = useNavigate();

  const downloadData = [
    {
      label: "Plain text (.txt)",
      onClick: () => handleDownload(currentTranslation, "text/plain"),
    },
    {
      label: "HTML (.html)",
      onClick: () => handleDownload(currentTranslation, "text/html"),
    },
    {
      label: "PDF (.pdf)",
      onClick: () => handleDownload(currentTranslation, "application/pdf"),
    },
    {
      label: "Word (.docx)",
      onClick: () =>
        handleDownload(
          currentTranslation,
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ),
    },
  ];

  return (
    <Container className="grid grid-cols-3 gap-2 p-2 bg-background border-b border-border">
      {viewMode ? (
        <ToggleGroup
          type="single"
          value={viewMode.mode}
          onValueChange={(value) => {
            if (!value) return;
            viewMode.onChange(value as Mode);
          }}
          className="p-0.5 border border-border rounded-md w-fit"
        >
          <ToggleGroupItem className="h-7 rounded-sm text-xs" value="original">
            Original
          </ToggleGroupItem>
          <ToggleGroupItem
            className="h-7 rounded-sm text-xs"
            value="translation"
          >
            Translation
          </ToggleGroupItem>
        </ToggleGroup>
      ) : (
        <Container className="flex items-center text-xs ml-2 font-medium text-muted-foreground">
          {shortenString(fileName, 45)}
        </Container>
      )}

      <Container className="flex items-center justify-center gap-3">
        <Container className="flex items-center gap-3 outline outline-1 outline-border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-none border-0 border-r border-border"
            onClick={() => updateScale(Math.max(0.3, scale - 0.1))}
            aria-label="Zoom out"
          >
            <ZoomOut size={16} />
          </Button>
          <span className="text-sm font-medium">
            {Math.round(scale * 100)}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-none border-0 border-l border-border"
            onClick={() => updateScale(scale + 0.1)}
            aria-label="Zoom in"
          >
            <ZoomIn size={16} />
          </Button>
        </Container>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-md border border-border"
          onClick={() => calculateScale()}
          aria-label="Fit to width"
        >
          <GalleryHorizontal size={16} />
        </Button>
      </Container>

      <Container className="flex items-center justify-end gap-4">
        <Container className="flex items-center outline outline-1 outline-border rounded-md">
          <Button
            variant="ghost"
            className="w-10 h-8 rounded-none border-0 border-r border-border"
            aria-label="Print"
            onClick={() => window.print()}
          >
            <Printer size={16} />
          </Button>
          <DropdownButton
            buttonData={{
              label: "Download",
              icon: <Download size={16} />,
            }}
            menuData={downloadData}
            variant="icon"
            className="w-10"
          />
        </Container>
        <Button
          variant="ghost"
          className="w-8 h-8"
          aria-label="Close"
          onClick={() => navigate(-1)}
        >
          <X size={16} />
        </Button>
      </Container>
    </Container>
  );
}
