import { GalleryHorizontal } from "lucide-react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "../button";
import Container from "../Container";
import { ToggleGroup, ToggleGroupItem } from "../toggle-group";
import { Mode } from "./HtmlViewer";

type ViewerControlsProps = {
  scaleControls: {
    scale: number;
    updateScale: (scale: number) => void;
    calculateScale: () => void;
  };
  viewMode?: {
    mode: Mode;
    onChange: (mode: Mode) => void;
  } | null;
};

export default function ViewerControls({
  scaleControls: { scale, updateScale, calculateScale },
  viewMode,
}: ViewerControlsProps) {
  return (
    <Container className="flex items-center gap-8 mb-4">
      {viewMode && (
        <ToggleGroup
          type="single"
          value={viewMode.mode}
          onValueChange={(value) => {
            if (!value) return;
            viewMode.onChange(value as Mode);
          }}
        >
          <ToggleGroupItem value="original">Original</ToggleGroupItem>
          <ToggleGroupItem value="translation">Translation</ToggleGroupItem>
        </ToggleGroup>
      )}

      <Container className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateScale(Math.max(0.3, scale - 0.1))}
          aria-label="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <span className="text-sm font-medium">{Math.round(scale * 100)}%</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => updateScale(scale + 0.1)}
          aria-label="Zoom in"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => calculateScale()}
          aria-label="Fit to width"
        >
          <GalleryHorizontal className="w-4 h-4" />
        </Button>
      </Container>
    </Container>
  );
}
