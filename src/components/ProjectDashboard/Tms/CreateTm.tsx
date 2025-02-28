import UploadTmForm from "@/components/Upload/UploadTmForm";
import Container from "../../ui/Container";
import PageTitle from "../../ui/PageTitle";

export default function UploadTm() {
  return (
    <Container>
      <PageTitle title="Upload translation resources" />
      <UploadTmForm />
    </Container>
  );
}
