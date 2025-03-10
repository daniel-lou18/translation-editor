import {
  allowedDocumentTypes,
  allowedExcelTypes,
  allowedTypes,
} from "@/utils/constants";

import { allowedMemoryTypes } from "@/utils/constants";

export type AllowedDocumentType = (typeof allowedDocumentTypes)[number];

export type AllowedMemoryType = (typeof allowedMemoryTypes)[number];

export type AllowedExcelType = (typeof allowedExcelTypes)[number];

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
