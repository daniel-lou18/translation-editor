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
