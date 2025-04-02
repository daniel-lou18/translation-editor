import { ReactNode } from "react";
import { A4_WIDTH } from "@/utils/constants";

type DocViewerErrorProps = {
  error: ReactNode;
  config?: {
    maxHeight: string;
    scale: number;
    width: number;
  };
};

export default function DocViewerError({
  error,
  config = { maxHeight: "80vh", scale: 1, width: A4_WIDTH },
}: DocViewerErrorProps) {
  return (
    <div
      className="flex justify-center border border-border bg-muted overflow-auto rounded-sm"
      style={{ maxHeight: config.maxHeight }}
    >
      <div
        style={{
          transform: `scale(${config.scale})`,
          transformOrigin: "top left",
          width: `${config.width}px`,
        }}
      >
        <div className="bg-white p-6 text-center text-red-500 rounded-sm">
          {error}
        </div>
      </div>
    </div>
  );
}
