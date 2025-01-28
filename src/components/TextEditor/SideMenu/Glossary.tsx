import Container from "@/components/ui/Container";
import { GlossarySearchResult } from "@/types/GlossaryTerm";
import GlossaryRow from "./GlossaryRow";

type GlossaryProps = {
  glossaryData: GlossarySearchResult[];
};

export default function Glossary({ glossaryData }: GlossaryProps) {
  if (glossaryData.length === 0) return null;

  return (
    <Container className="grid grid-cols-2 text-xs">
      <Container className="font-semibold text-sm border-b border-r border-t border-border p-1">
        {glossaryData[0].tmDocumentPair?.sourceLang || ""}{" "}
      </Container>
      <Container className="font-semibold text-sm border-b border-t border-border p-1">
        {glossaryData[0].tmDocumentPair?.targetLang || ""}{" "}
      </Container>
      {glossaryData.map(({ glossaryTerm }) => (
        <GlossaryRow glossaryTerm={glossaryTerm} />
      ))}
    </Container>
  );
}
