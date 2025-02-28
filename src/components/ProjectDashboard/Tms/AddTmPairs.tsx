import UploadTmForm from "@/components/Upload/UploadTmForm";
import Container from "../../ui/Container";
import PageTitle from "../../ui/PageTitle";

export default function AddTmPairs() {
  return (
    <Container>
      <PageTitle title="Add segments to TM" />
      <UploadTmForm newTm={false} />
    </Container>
  );
}
