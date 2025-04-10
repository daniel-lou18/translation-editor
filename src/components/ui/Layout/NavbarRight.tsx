import ModeToggle from "./Theme";
import UserMenu from "./UserMenu";
import Container from "../Container";
import { translationStatusConfig } from "@/config/translationsTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import { CloudUpload } from "lucide-react";
import { CheckCheck } from "lucide-react";
import { useMutationState } from "@tanstack/react-query";
import { useRoute } from "@/hooks/useRoute";
import { Separator } from "../separator";

export default function NavbarRight() {
  const { currentTranslation } = useCurrentProject();
  const { translationId } = useRoute();

  const data = useMutationState({
    filters: { mutationKey: ["save-segments", translationId] },
  });
  const isSavingSegments = data.some(
    (mutation) => mutation.status === "pending"
  );

  return (
    <Container className="flex items-center gap-2">
      <Select value={currentTranslation?.status || "open"}>
        <SelectTrigger className="h-8 min-w-24 w-auto gap-2 text-xs border-border">
          <SelectValue>
            <Container className="flex items-center">
              {currentTranslation?.status
                ? translationStatusConfig[currentTranslation.status].icon
                : null}
              {currentTranslation?.status
                ? translationStatusConfig[currentTranslation.status].text
                : null}
            </Container>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Object.entries(translationStatusConfig).map(([key, status]) => (
            <SelectItem key={key} value={key}>
              {status.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Container
        className={`h-8 w-8 rounded-md flex items-center justify-center border ${
          isSavingSegments
            ? "border-border bg-muted"
            : "border-emerald-300 bg-emerald-50"
        }`}
      >
        {isSavingSegments ? (
          <CloudUpload className="w-4 h-4 animate-pulse" />
        ) : (
          <CheckCheck className="w-4 h-4 text-emerald-500" />
        )}
      </Container>
      <ModeToggle />
      <UserMenu />
    </Container>
  );
}
