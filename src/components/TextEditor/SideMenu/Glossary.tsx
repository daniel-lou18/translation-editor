import { GlossarySearchResult } from "@/types/GlossaryTerm";
import GlossaryRow from "./GlossaryRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type GlossaryProps = {
  glossaryData: GlossarySearchResult[];
};

export default function Glossary({ glossaryData }: GlossaryProps) {
  if (glossaryData.length === 0)
    return (
      <p className="text-sm text-muted-foreground px-2 py-1">
        No corresponding terms found
      </p>
    );

  return (
    <Table className="text-sm">
      <TableHeader className="bg-cat-memory">
        <TableRow className="font-bold">
          <TableHead>
            {glossaryData[0].tmDocumentPair?.sourceLang || ""}
          </TableHead>
          <TableHead>
            {glossaryData[0].tmDocumentPair?.targetLang || ""}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {glossaryData.map(({ glossaryTerm }) => (
          <GlossaryRow glossaryTerm={glossaryTerm} />
        ))}
      </TableBody>
    </Table>
  );
}
