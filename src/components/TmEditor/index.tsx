import Container from "../ui/Container";
import TmSegments from "./TmSegments/TmSegments";
import TmControls from "./TmControls";
import TmEditorControls from "./TmEditorControls";

export default function TmEditor() {
  return (
    <Container className="grid grid-cols-12 border-b border-border">
      <TmControls />
      <TmEditorControls />
      <TmSegments />
    </Container>
  );
}
