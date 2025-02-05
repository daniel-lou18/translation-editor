import Container from "../ui/Container";
import PageTitle from "../ui/PageTitle";
import Upload from "../Upload";

export default function UploadDocument() {
  return (
    <Container>
      <PageTitle title="Upload document" />
      <Upload variant="document" />
    </Container>
  );
}
