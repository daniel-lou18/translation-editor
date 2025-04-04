import Container from "@/components/ui/Container";
import PageTitle from "@/components/ui/PageTitle";
import Quickstart from "./Quickstart";
import WorkspaceProjects from "./WorkspaceProjects";
import WorkspaceTranslations from "./WorkspaceTranslations";
import documentIcon from "@/assets/document.svg";

export default function Workspace() {
  const titleComponent = (
    <>
      <span className="inline-block">
        <img src={documentIcon} alt="Document Icon" />
      </span>
      Welcome to your workspace, Daniel
    </>
  );
  return (
    <>
      <PageTitle
        title={titleComponent}
        level={1}
        classNames={{
          heading: "flex justify-center w-full mb-4",
        }}
      />
      <Container className="space-y-12">
        <Quickstart />
        <WorkspaceTranslations />
        <WorkspaceProjects />
      </Container>
    </>
  );
}
