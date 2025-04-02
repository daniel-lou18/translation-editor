import { generateHtmlLayout } from "@/components/ui/DocViewer/helpers";
import { RefObject, useEffect, useState } from "react";

type LayoutConfig = {
  width: number;
  height: number;
  padding: number;
  gap: number;
};

export function useLoadIframe(
  html: string | undefined,
  iframeRef: RefObject<HTMLIFrameElement>,
  layout: LayoutConfig
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (!html) {
      setError("No content available");
      setIsLoading(false);
      return;
    }

    try {
      const iframe = iframeRef.current;
      if (!iframe) return;
      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) return;

      iframeDoc.open();
      iframeDoc.write(
        generateHtmlLayout(html, {
          width: layout.width,
          height: layout.height,
          padding: layout.padding,
          gap: layout.gap,
        })
      );
      iframeDoc.close();
    } catch (err) {
      console.error("Error rendering HTML content", err);
      setError("Failed to render HTML content");
    } finally {
      setIsLoading(false);
    }
  }, [html, iframeRef]);

  return { isLoading, error };
}
