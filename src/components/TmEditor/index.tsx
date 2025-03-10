import Container from "../ui/Container";
import TmSegments from "./TmSegments/TmSegments";

export default function TmEditor() {
  return (
    <Container className="grid grid-cols-12 border-b border-border">
      <TmSegments />
    </Container>
  );
}
