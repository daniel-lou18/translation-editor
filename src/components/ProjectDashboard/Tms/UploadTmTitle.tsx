import Container from "../../ui/Container";
import PageTitle from "../../ui/PageTitle";
import PageControls from "@/components/ui/PageControls";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PropsWithChildren } from "react";
import { TmFormats } from "@/hooks/useTmFileFormat";

type UploadTmProps = PropsWithChildren<{
  title: string;
  tmFormat: string;
  toggleTmFormat: (format: string) => void;
  tmFormats: TmFormats;
  setSourceFile: React.Dispatch<React.SetStateAction<File | null>>;
  setTargetFile: React.Dispatch<React.SetStateAction<File | null>>;
}>;

export default function UploadTmTitle({
  title,
  children,
  tmFormat,
  toggleTmFormat,
  tmFormats,
}: UploadTmProps) {
  return (
    <Container>
      <Container className="flex justify-between mb-6">
        <PageTitle title={title} />
        <PageControls>
          <ToggleGroup
            type="single"
            value={tmFormat}
            onValueChange={toggleTmFormat}
          >
            {tmFormats.map(({ type, Icon }) => (
              <ToggleGroupItem
                value={type}
                aria-label={`Toggle ${type}`}
                className="data-[state=on]:bg-cat-accent/10"
              >
                {<Icon />}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </PageControls>
      </Container>
      {children}
    </Container>
  );
}
