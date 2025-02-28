import NewUploadTmForm from "@/components/Upload/NewUploadTmForm";
import Container from "../../ui/Container";
import PageTitle from "../../ui/PageTitle";

export default function UploadTm() {
  return (
    <Container>
      <PageTitle title="Upload translation resources" />
      <NewUploadTmForm />
    </Container>
  );
}
