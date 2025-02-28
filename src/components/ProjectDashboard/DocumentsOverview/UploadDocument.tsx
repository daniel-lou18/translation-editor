import UploadDocumentForm from "@/components/Upload/UploadDocumentForm";
import Container from "../../ui/Container";
import PageTitle from "../../ui/PageTitle";

export default function UploadDocument() {
  return (
    <Container>
      <PageTitle title="Upload document" />
      <UploadDocumentForm newProject={false} />
    </Container>
  );
}
