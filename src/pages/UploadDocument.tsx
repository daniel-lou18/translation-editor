import UploadDocument, {
  UploadDocumentProps,
} from "@/components/ProjectDashboard/Documents/UploadDocument";

export default function UploadDocumentPage({ mode }: UploadDocumentProps) {
  return <UploadDocument mode={mode} />;
}
