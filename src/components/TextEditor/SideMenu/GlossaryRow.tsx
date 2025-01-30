import { TableCell, TableRow } from "@/components/ui/table";
import { GlossaryTerm } from "@/types/GlossaryTerm";

type GlossaryRowProps = {
  glossaryTerm: GlossaryTerm;
};

export default function GlossaryRow({ glossaryTerm }: GlossaryRowProps) {
  const { sourceTerm, targetTerm } = glossaryTerm;
  return (
    <TableRow>
      <TableCell>{sourceTerm}</TableCell>
      <TableCell>{targetTerm}</TableCell>
    </TableRow>
  );
}
