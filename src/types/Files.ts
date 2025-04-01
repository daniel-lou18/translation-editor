import { isAllowedType } from "@/utils/helpers";

export const PLAIN_TEXT_FORMATS = ["txt", "csv", "tsv"] as const;
export const HTML_FORMATS = ["xml", "html"] as const;
export const TEXT_FORMATS = [...PLAIN_TEXT_FORMATS, ...HTML_FORMATS] as const;
export const EXCEL_FORMATS = ["xlsx", "xls"] as const;
export const PDF_FORMATS = ["pdf"] as const;
export const WORD_FORMATS = ["docx", "doc"] as const;
export const IMAGE_FORMATS = ["bmp", "png", "jpg", "jpeg", "webp"] as const;

export type TextFormat = (typeof TEXT_FORMATS)[number];
export type PlainTextFormat = (typeof PLAIN_TEXT_FORMATS)[number];
export type HtmlFormat = (typeof HTML_FORMATS)[number];
export type ExcelFormat = (typeof EXCEL_FORMATS)[number];
export type PdfFormat = (typeof PDF_FORMATS)[number];
export type WordFormat = (typeof WORD_FORMATS)[number];
export type ImageFormat = (typeof IMAGE_FORMATS)[number];
export type MemoryFormat = (typeof MEMORY_FORMATS)[number];
export type DocumentFormat = (typeof DOCUMENT_FORMATS)[number];

export type ConversionFormat =
  | PdfFormat
  | WordFormat
  | ExcelFormat
  | TextFormat
  | ImageFormat;

export const DOCUMENT_FORMATS = [
  ...TEXT_FORMATS,
  ...EXCEL_FORMATS,
  ...PDF_FORMATS,
  ...WORD_FORMATS,
  ...IMAGE_FORMATS,
] as const;

export const MEMORY_FORMATS = [
  ...EXCEL_FORMATS,
  ...PDF_FORMATS,
  ...WORD_FORMATS,
  ...IMAGE_FORMATS,
  ".xml",
] as const;

export const ALLOWED_FORMATS = [
  ...MEMORY_FORMATS,
  ...DOCUMENT_FORMATS,
] as const;

export type ContentType =
  (typeof outputContentTypes)[keyof typeof outputContentTypes];

export type ExportFileType = keyof typeof outputContentTypes;

export const outputContentTypes = {
  txt: "text/plain",
  csv: "text/csv",
  json: "application/json",
  pdf: "application/pdf",
} as const;

export type BlobResponse = { data: Blob; fileName: string };

export function getFileType(fileName: string | undefined) {
  if (!fileName) return null;

  if (isAllowedType(fileName, HTML_FORMATS)) {
    return "html";
  }
  if (isAllowedType(fileName, TEXT_FORMATS)) {
    return "txt";
  }
  if (isAllowedType(fileName, PDF_FORMATS)) {
    return "pdf";
  }
  if (isAllowedType(fileName, IMAGE_FORMATS)) {
    return "image";
  }
  if (isAllowedType(fileName, WORD_FORMATS)) {
    return "word";
  }
  if (isAllowedType(fileName, EXCEL_FORMATS)) {
    return "excel";
  }
  return null;
}

export const WORD_MIME_TYPES = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
] as const;

export const PDF_MIME_TYPES = ["application/pdf"] as const;

export const PLAIN_TEXT_MIME_TYPES = [
  "text/plain",
  "text/csv",
  "text/tab-separated-values",
  "text/comma-separated-values",
] as const;

export const HTML_MIME_TYPES = ["text/html", "text/xml"] as const;

export const TEXT_MIME_TYPES = [
  ...PLAIN_TEXT_MIME_TYPES,
  ...HTML_MIME_TYPES,
] as const;

export const IMAGE_MIME_TYPES = [
  "image/bmp",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

export const EXCEL_MIME_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
] as const;

export const MIME_TYPES = [
  ...WORD_MIME_TYPES,
  ...IMAGE_MIME_TYPES,
  ...PDF_MIME_TYPES,
  ...TEXT_MIME_TYPES,
  ...EXCEL_MIME_TYPES,
] as const;

export const DOCUMENT_MIME_TYPES = [
  ...IMAGE_MIME_TYPES,
  ...PDF_MIME_TYPES,
  ...TEXT_MIME_TYPES,
] as const;

export const MEMORY_MIME_TYPES = [
  ...EXCEL_MIME_TYPES,
  ...PDF_MIME_TYPES,
  ...WORD_MIME_TYPES,
  ...IMAGE_MIME_TYPES,
] as const;

export type MimeType = (typeof MIME_TYPES)[number];

export const MimeTypeToFileTypeMap: Record<MimeType, DocumentFormat> = {
  // Word formats
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "application/msword": "doc",

  // Image formats
  "image/bmp": "bmp",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",

  // PDF format
  "application/pdf": "pdf",

  // Text formats
  "text/plain": "txt",
  "text/html": "html",
  "text/xml": "xml",
  "text/csv": "csv",
  "text/tab-separated-values": "tsv",
  "text/comma-separated-values": "csv",

  // Excel formats
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.ms-excel": "xls",
} as const;

export const FileTypeToMimeTypeMap: Record<DocumentFormat, MimeType> = {
  txt: "text/plain",
  csv: "text/csv",
  xml: "text/xml",
  html: "text/html",
  pdf: "application/pdf",
  bmp: "image/bmp",
  jpg: "image/jpg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  doc: "application/msword",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  xls: "application/vnd.ms-excel",
  tsv: "text/tab-separated-values",
} as const;

export const getMimeType = (fileName: string | undefined) => {
  if (!fileName) return null;

  // Get the file extension
  const extension = fileName.toLowerCase().split(".").pop();
  if (!extension) return null;

  // Check if it's a valid document format
  if (!isAllowedType(fileName, DOCUMENT_FORMATS)) return null;

  // Get the MIME type from our map
  return FileTypeToMimeTypeMap[extension as DocumentFormat] ?? null;
};
