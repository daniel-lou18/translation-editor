import { useRef, useState } from "react";
import ViewerControls from "./ViewerControls";
import DocViewerSkeleton from "./DocViewerSkeleton";
import { A4_LAYOUT_CONFIG } from "@/utils/constants";
import { useViewerScale } from "@/hooks/useViewerScale";
import DocViewerContainer from "./DocViewerContainer";

interface PDFViewerProps {
  data: {
    pdfUrl: string;
    fileName: string;
  };
  layout?: {
    initialScale?: number;
    onScaleChange?: (scale: number) => void;
  };
}

export default function PDFViewer({
  data: { pdfUrl, fileName },
  layout: { initialScale = 1, onScaleChange } = {},
}: PDFViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const objectRef = useRef<HTMLObjectElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { scale, calculateScale, updateScale } = useViewerScale(containerRef, {
    initialScale,
    width: A4_LAYOUT_CONFIG.width,
    onScaleChange,
  });

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <DocViewerContainer>
      <ViewerControls
        scaleControls={{ scale, updateScale, calculateScale }}
        fileName={fileName}
      />

      <div
        ref={containerRef}
        className="flex justify-center bg-muted p-5 overflow-auto"
      >
        <div
          className="relative bg-white shadow-md"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: A4_LAYOUT_CONFIG.width,
            height: A4_LAYOUT_CONFIG.height,
          }}
        >
          {isLoading && <DocViewerSkeleton />}
          <object
            ref={objectRef}
            data={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            type="application/pdf"
            width="100%"
            height="100%"
            className="shadow-md"
            onLoad={handleLoad}
            aria-label={`pdf-${fileName}`}
          >
            <div className="p-4 text-center">
              <p>Your browser doesn't support embedded PDFs.</p>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Download the PDF
              </a>
            </div>
          </object>
        </div>
      </div>
    </DocViewerContainer>
  );
}
