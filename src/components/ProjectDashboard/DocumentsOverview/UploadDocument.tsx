import Container from "../../ui/Container";
import PageTitle from "../../ui/PageTitle";
import UploadForm from "../../Upload/UploadForm";

export default function UploadDocument() {
  return (
    <Container>
      <PageTitle title="Upload document" />
      <UploadForm variant="memory" newProject={false} />
    </Container>
  );
}
