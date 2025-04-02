import { RefObject, useCallback, useEffect, useState } from "react";

type ViewerScaleConfig = {
  initialScale: number;
  width: number;
  onScaleChange?: (scale: number) => void;
};

export function useViewerScale(
  containerRef: RefObject<HTMLDivElement>,
  config: ViewerScaleConfig
) {
  const [scale, setScale] = useState<number>(config.initialScale);

  const calculateScale = useCallback((): void => {
    const containerWidth: number =
      containerRef.current?.clientWidth || window.innerWidth * 0.9;

    // Calculate the scale factor to fit the container width
    const newScale: number = Math.min(1, containerWidth / config.width);
    updateScale(newScale);
  }, [containerRef, config.width]);

  const updateScale = useCallback(
    (newScale: number): void => {
      setScale(newScale);
      if (config.onScaleChange) {
        config.onScaleChange(newScale);
      }
    },
    [config.onScaleChange]
  );

  useEffect(() => {
    calculateScale();

    const handleResize = (): void => {
      calculateScale();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [config.width]);

  return { scale, calculateScale, updateScale };
}
