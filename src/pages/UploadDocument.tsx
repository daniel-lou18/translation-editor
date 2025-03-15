import UploadDocument, {
  UploadDocumentProps,
} from "@/components/ProjectDashboard/DocumentsOverview/UploadDocument";

export default function UploadDocumentPage({ mode }: UploadDocumentProps) {
  return <UploadDocument mode={mode} />;
}
