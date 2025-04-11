import { translationStatusConfig } from "@/config/translationsTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Container from "@/components/ui/Container";
import { TranslationStatus as TranslationStatusType } from "@/types";

type TranslationStatusProps = {
  status: TranslationStatusType;
  statusConfig: Record<
    TranslationStatusType,
    { text: string; icon?: React.ReactNode }
  >;
  onStatusChange: (status: TranslationStatusType) => void;
};

export default function TranslationStatus({
  status,
  statusConfig,
  onStatusChange,
}: TranslationStatusProps) {
  return (
    <Select value={status} onValueChange={onStatusChange}>
      <SelectTrigger className="h-8 min-w-24 w-auto gap-2 text-xs border-border">
        <SelectValue>
          <Container className="flex items-center">
            {status ? statusConfig[status].icon : null}
            {status ? statusConfig[status].text : null}
          </Container>
        </SelectValue>
      </SelectTrigger>
      <SelectContent position="popper">
        {Object.entries(statusConfig).map(([key, status]) => (
          <SelectItem key={key} value={key}>
            <div className="flex items-center gap-2">
              {status?.icon}
              {status.text}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
