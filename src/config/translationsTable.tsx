import { TranslationStatus } from "@/types/Translation";
import {
  Archive,
  CheckCircle,
  Loader,
  PauseCircle,
  PencilOff,
  ThumbsUp,
  XCircle,
} from "lucide-react";
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

export const translationStatusConfig: Record<
  TranslationStatus,
  { text: string; icon?: React.ReactNode }
> = {
  not_started: {
    text: "not started",
    icon: <PencilOff className="h-4 w-4 mr-1" strokeWidth={1.5} />,
  },
  in_progress: {
    text: "in progress",
    icon: <Loader className="h-4 w-4 mr-1" strokeWidth={1.5} />,
  },
  completed: {
    text: "completed",
    icon: (
      <CheckCircle className="h-4 w-4 text-green-500 mr-1" strokeWidth={1.5} />
    ),
  },
  approved: {
    text: "approved",
    icon: (
      <ThumbsUp className="h-4 w-4 text-green-500 mr-1" strokeWidth={1.5} />
    ),
  },
  rejected: {
    text: "rejected",
    icon: <XCircle className="h-4 w-4 text-red-500 mr-1" strokeWidth={1.5} />,
  },
  on_hold: {
    text: "on hold",
    icon: <PauseCircle className="h-4 w-4 mr-1" strokeWidth={1.5} />,
  },
  canceled: {
    text: "canceled",
    icon: <XCircle className="h-4 w-4 mr-1" strokeWidth={1.5} />,
  },
  archived: {
    text: "archived",
    icon: <Archive className="h-4 w-4 mr-1" strokeWidth={1.5} />,
  },
};
