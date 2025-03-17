import { isAllowedType } from "@/utils/helpers";

export const allowedExcelTypes = [".xlsx", ".xls"] as const;
export const allowedHtmlTypes = [".html", ".mhtml"] as const;
export const allowedPlainTextTypes = [".txt"] as const;
export const allowedCsvTypes = [".csv"] as const;
export const allowedDocTypes = [".doc", ".docx"] as const;
export const allowedPdfTypes = [".pdf"] as const;
export const allowedImageTypes = [
  ".png",
  ".bmp",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".svg",
] as const;

export const allowedDocumentTypes = [
  ...allowedHtmlTypes,
  ...allowedPlainTextTypes,
  ...allowedDocTypes,
  ...allowedPdfTypes,
  ...allowedImageTypes,
  ".xml",
] as const;

export const allowedMemoryTypes = [
  ...allowedExcelTypes,
  ...allowedHtmlTypes,
  ...allowedPlainTextTypes,
  ...allowedCsvTypes,
  ...allowedPdfTypes,
  ...allowedImageTypes,
  ".xml",
] as const;

export const allowedTypes = [
  ...allowedMemoryTypes,
  ...allowedDocumentTypes,
] as const;

export type AllowedDocumentType = (typeof allowedDocumentTypes)[number];

export type AllowedMemoryType = (typeof allowedMemoryTypes)[number];

export type AllowedExcelType = (typeof allowedExcelTypes)[number];

export type AllowedHtmlType = (typeof allowedHtmlTypes)[number];

export type AllowedImageType = (typeof allowedImageTypes)[number];

export type AllowedType = (typeof allowedTypes)[number];

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

export function getFileType(fileName: string) {
  if (isAllowedType(fileName, allowedHtmlTypes)) {
    return "html";
  }
  if (isAllowedType(fileName, allowedPlainTextTypes)) {
    return "txt";
  }
  if (isAllowedType(fileName, allowedPdfTypes)) {
    return "pdf";
  }
  if (isAllowedType(fileName, allowedImageTypes)) {
    return "image";
  }
  if (isAllowedType(fileName, allowedCsvTypes)) {
    return "csv";
  }
  if (isAllowedType(fileName, allowedDocTypes)) {
    return "doc";
  }
}
