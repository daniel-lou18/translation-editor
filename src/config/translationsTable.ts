export const EXPORT_FORMATS = {
  TEXT: {
    label: "Plain text (.txt)",
    mimeType: "text/plain",
  },
  HTML: {
    label: "HTML (.html)",
    mimeType: "text/html",
  },
  PDF: {
    label: "PDF (.pdf)",
    mimeType: "application/pdf",
  },
  DOCX: {
    label: "Microsoft Word (.docx)",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
} as const;
