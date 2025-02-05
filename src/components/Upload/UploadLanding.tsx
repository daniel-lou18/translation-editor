import Upload from ".";
import Container from "../ui/Container";

export default function UploadLanding() {
  return (
    <Container className="min-h-screen max-w-6xl mx-auto p-8 space-y-8">
      <Container className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">
          Start a new translation
        </h1>
        <p className="text-muted-foreground">
          Upload the document you want to translate, together with its TM files
        </p>
      </Container>
      <Upload />
    </Container>
  );
}
