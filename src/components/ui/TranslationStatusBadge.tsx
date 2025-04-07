import { TranslationStatus } from "@/types/Translation";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

type TranslationStatusBadgeProps = {
  status: TranslationStatus | null;
  translationStatusConfig: Record<
    string,
    { icon?: React.ReactNode; text: string }
  >;
  className?: string;
};

export default function TranslationStatusBadge({
  status,
  translationStatusConfig,
  className,
}: TranslationStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-muted-foreground rounded-md whitespace-nowrap",
        className
      )}
    >
      {status && translationStatusConfig[status]
        ? translationStatusConfig[status].icon
        : translationStatusConfig.not_started.icon}
      {status && translationStatusConfig[status]
        ? translationStatusConfig[status].text
        : "not started"}
    </Badge>
  );
}
