import { WordLayout } from "@/utils/constants";

export const convertPtToPx = (pt: number) => pt * (96 / 72);

export const parseDocxPageLayout = (
  cssText: string,
  defaultLayout: WordLayout
): WordLayout => {
  const pageRuleRegex =
    /@page\s+WordSection1\s*\{\s*size:\s*([\d.]+pt)\s+([\d.]+pt);\s*margin:\s*([\d.]+pt)\s+([\d.]+pt)\s+([\d.]+pt)\s+([\d.]+pt);\s*\}/i; // Make selector specific if needed
  const match = cssText.match(pageRuleRegex);

  if (match) {
    return {
      width: convertPtToPx(parseFloat(match[1])),
      minHeight: convertPtToPx(parseFloat(match[2])),
      paddingTop: convertPtToPx(parseFloat(match[3])),
      paddingBottom: convertPtToPx(parseFloat(match[4])),
      paddingLeft: convertPtToPx(parseFloat(match[5])),
      paddingRight: convertPtToPx(parseFloat(match[6])),
    };
  }
  return defaultLayout;
};

export function generateHtmlLayout(html: string, config: HtmlLayoutConfig) {
  const { width, height, padding, gap } = config;
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: ui-sans-serif, system-ui, sans-serif;
          box-sizing: border-box;
          background-color: #f5f5f5;
          overflow: hidden
        }
        * {
          box-sizing: border-box;
        }
        .pages-container {
          padding: ${gap}px 0px;
        }
        .page {
        position: relative;
        width: ${width}px;
        min-height: ${height}px;
        padding: ${padding}px;
        margin: 0 auto ${gap}px;
        box-sizing: border-box;
        page-break-after: always;
        break-after: page;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      </style>
    </head>
    <body>
      <div class="pages-container">
        ${html}
      </div>
    </body>
  </html>
  `;
}

export type HtmlLayoutConfig = {
  width: number;
  height: number;
  padding: number;
  gap: number;
};

export function createScopedCss(
  styleElement: HTMLStyleElement,
  containerClassName = "docx-viewer-container"
) {
  {
    const marker = "/* Style Definitions */";
    const cssText = styleElement.innerHTML;
    const markerIndex = cssText.indexOf(marker);

    if (markerIndex !== -1) {
      const beforeDefinitions = cssText.substring(
        0,
        markerIndex + marker.length
      );
      const afterDefinitions = cssText.substring(markerIndex + marker.length);

      // Scope only the part after the marker
      const scopedAfterDefinitions = afterDefinitions.replace(
        /((?:[a-z]+|\.)[^{}]*)\{/g, // Match selectors starting with tag or .
        (match, selector) => {
          const trimmedSelector = selector.trim();
          // Basic check to avoid scoping @ rules like @page
          if (trimmedSelector.startsWith("@")) {
            return match; // Don't scope @ rules
          }
          // Scope other selectors (tags, classes)
          return `.${containerClassName} ${trimmedSelector} {`;
        }
      );

      return beforeDefinitions + scopedAfterDefinitions;
    } else {
      console.error("Could not find '/* Style Definitions */' marker in CSS.");
      return cssText;
    }
  }
}
