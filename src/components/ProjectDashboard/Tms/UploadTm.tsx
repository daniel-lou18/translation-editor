import Container from "../../ui/Container";
import PageTitle from "../../ui/PageTitle";
import UploadForm from "../../Upload/UploadForm";

export default function UploadTm() {
  return (
    <Container>
      <PageTitle title="Upload translation resources" />
      <UploadForm variant="memory" newProject={false} />
    </Container>
  );
}
