import Container from "@/components/ui/Container";
import { GlossaryTerm } from "@/types/GlossaryTerm";

type GlossaryRowProps = {
  glossaryTerm: GlossaryTerm;
};

export default function GlossaryRow({ glossaryTerm }: GlossaryRowProps) {
  const { sourceTerm, targetTerm } = glossaryTerm;
  return (
    <>
      <Container className="border-r border-border p-1">
        {sourceTerm}{" "}
      </Container>
      <Container className="p-1">{targetTerm}</Container>
    </>
  );
}
